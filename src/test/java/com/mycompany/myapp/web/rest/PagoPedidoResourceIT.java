package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JhipsterSampleApplicationApp;
import com.mycompany.myapp.domain.PagoPedido;
import com.mycompany.myapp.repository.PagoPedidoRepository;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link PagoPedidoResource} REST controller.
 */
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class PagoPedidoResourceIT {

    private static final Float DEFAULT_CANTIDAD = 1F;
    private static final Float UPDATED_CANTIDAD = 2F;

    @Autowired
    private PagoPedidoRepository pagoPedidoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restPagoPedidoMockMvc;

    private PagoPedido pagoPedido;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PagoPedidoResource pagoPedidoResource = new PagoPedidoResource(pagoPedidoRepository);
        this.restPagoPedidoMockMvc = MockMvcBuilders.standaloneSetup(pagoPedidoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PagoPedido createEntity(EntityManager em) {
        PagoPedido pagoPedido = new PagoPedido()
            .cantidad(DEFAULT_CANTIDAD);
        return pagoPedido;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PagoPedido createUpdatedEntity(EntityManager em) {
        PagoPedido pagoPedido = new PagoPedido()
            .cantidad(UPDATED_CANTIDAD);
        return pagoPedido;
    }

    @BeforeEach
    public void initTest() {
        pagoPedido = createEntity(em);
    }

    @Test
    @Transactional
    public void createPagoPedido() throws Exception {
        int databaseSizeBeforeCreate = pagoPedidoRepository.findAll().size();

        // Create the PagoPedido
        restPagoPedidoMockMvc.perform(post("/api/pago-pedidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pagoPedido)))
            .andExpect(status().isCreated());

        // Validate the PagoPedido in the database
        List<PagoPedido> pagoPedidoList = pagoPedidoRepository.findAll();
        assertThat(pagoPedidoList).hasSize(databaseSizeBeforeCreate + 1);
        PagoPedido testPagoPedido = pagoPedidoList.get(pagoPedidoList.size() - 1);
        assertThat(testPagoPedido.getCantidad()).isEqualTo(DEFAULT_CANTIDAD);
    }

    @Test
    @Transactional
    public void createPagoPedidoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = pagoPedidoRepository.findAll().size();

        // Create the PagoPedido with an existing ID
        pagoPedido.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPagoPedidoMockMvc.perform(post("/api/pago-pedidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pagoPedido)))
            .andExpect(status().isBadRequest());

        // Validate the PagoPedido in the database
        List<PagoPedido> pagoPedidoList = pagoPedidoRepository.findAll();
        assertThat(pagoPedidoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPagoPedidos() throws Exception {
        // Initialize the database
        pagoPedidoRepository.saveAndFlush(pagoPedido);

        // Get all the pagoPedidoList
        restPagoPedidoMockMvc.perform(get("/api/pago-pedidos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pagoPedido.getId().intValue())))
            .andExpect(jsonPath("$.[*].cantidad").value(hasItem(DEFAULT_CANTIDAD.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getPagoPedido() throws Exception {
        // Initialize the database
        pagoPedidoRepository.saveAndFlush(pagoPedido);

        // Get the pagoPedido
        restPagoPedidoMockMvc.perform(get("/api/pago-pedidos/{id}", pagoPedido.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(pagoPedido.getId().intValue()))
            .andExpect(jsonPath("$.cantidad").value(DEFAULT_CANTIDAD.doubleValue()));
    }

    @Test
    @Transactional
    public void getNonExistingPagoPedido() throws Exception {
        // Get the pagoPedido
        restPagoPedidoMockMvc.perform(get("/api/pago-pedidos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePagoPedido() throws Exception {
        // Initialize the database
        pagoPedidoRepository.saveAndFlush(pagoPedido);

        int databaseSizeBeforeUpdate = pagoPedidoRepository.findAll().size();

        // Update the pagoPedido
        PagoPedido updatedPagoPedido = pagoPedidoRepository.findById(pagoPedido.getId()).get();
        // Disconnect from session so that the updates on updatedPagoPedido are not directly saved in db
        em.detach(updatedPagoPedido);
        updatedPagoPedido
            .cantidad(UPDATED_CANTIDAD);

        restPagoPedidoMockMvc.perform(put("/api/pago-pedidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPagoPedido)))
            .andExpect(status().isOk());

        // Validate the PagoPedido in the database
        List<PagoPedido> pagoPedidoList = pagoPedidoRepository.findAll();
        assertThat(pagoPedidoList).hasSize(databaseSizeBeforeUpdate);
        PagoPedido testPagoPedido = pagoPedidoList.get(pagoPedidoList.size() - 1);
        assertThat(testPagoPedido.getCantidad()).isEqualTo(UPDATED_CANTIDAD);
    }

    @Test
    @Transactional
    public void updateNonExistingPagoPedido() throws Exception {
        int databaseSizeBeforeUpdate = pagoPedidoRepository.findAll().size();

        // Create the PagoPedido

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPagoPedidoMockMvc.perform(put("/api/pago-pedidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pagoPedido)))
            .andExpect(status().isBadRequest());

        // Validate the PagoPedido in the database
        List<PagoPedido> pagoPedidoList = pagoPedidoRepository.findAll();
        assertThat(pagoPedidoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePagoPedido() throws Exception {
        // Initialize the database
        pagoPedidoRepository.saveAndFlush(pagoPedido);

        int databaseSizeBeforeDelete = pagoPedidoRepository.findAll().size();

        // Delete the pagoPedido
        restPagoPedidoMockMvc.perform(delete("/api/pago-pedidos/{id}", pagoPedido.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<PagoPedido> pagoPedidoList = pagoPedidoRepository.findAll();
        assertThat(pagoPedidoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PagoPedido.class);
        PagoPedido pagoPedido1 = new PagoPedido();
        pagoPedido1.setId(1L);
        PagoPedido pagoPedido2 = new PagoPedido();
        pagoPedido2.setId(pagoPedido1.getId());
        assertThat(pagoPedido1).isEqualTo(pagoPedido2);
        pagoPedido2.setId(2L);
        assertThat(pagoPedido1).isNotEqualTo(pagoPedido2);
        pagoPedido1.setId(null);
        assertThat(pagoPedido1).isNotEqualTo(pagoPedido2);
    }
}
