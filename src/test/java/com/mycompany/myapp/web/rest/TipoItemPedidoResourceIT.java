package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JhipsterSampleApplicationApp;
import com.mycompany.myapp.domain.TipoItemPedido;
import com.mycompany.myapp.repository.TipoItemPedidoRepository;
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
 * Integration tests for the {@link TipoItemPedidoResource} REST controller.
 */
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class TipoItemPedidoResourceIT {

    private static final String DEFAULT_NOMBRE_TIPO = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE_TIPO = "BBBBBBBBBB";

    @Autowired
    private TipoItemPedidoRepository tipoItemPedidoRepository;

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

    private MockMvc restTipoItemPedidoMockMvc;

    private TipoItemPedido tipoItemPedido;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TipoItemPedidoResource tipoItemPedidoResource = new TipoItemPedidoResource(tipoItemPedidoRepository);
        this.restTipoItemPedidoMockMvc = MockMvcBuilders.standaloneSetup(tipoItemPedidoResource)
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
    public static TipoItemPedido createEntity(EntityManager em) {
        TipoItemPedido tipoItemPedido = new TipoItemPedido()
            .nombreTipo(DEFAULT_NOMBRE_TIPO);
        return tipoItemPedido;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoItemPedido createUpdatedEntity(EntityManager em) {
        TipoItemPedido tipoItemPedido = new TipoItemPedido()
            .nombreTipo(UPDATED_NOMBRE_TIPO);
        return tipoItemPedido;
    }

    @BeforeEach
    public void initTest() {
        tipoItemPedido = createEntity(em);
    }

    @Test
    @Transactional
    public void createTipoItemPedido() throws Exception {
        int databaseSizeBeforeCreate = tipoItemPedidoRepository.findAll().size();

        // Create the TipoItemPedido
        restTipoItemPedidoMockMvc.perform(post("/api/tipo-item-pedidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoItemPedido)))
            .andExpect(status().isCreated());

        // Validate the TipoItemPedido in the database
        List<TipoItemPedido> tipoItemPedidoList = tipoItemPedidoRepository.findAll();
        assertThat(tipoItemPedidoList).hasSize(databaseSizeBeforeCreate + 1);
        TipoItemPedido testTipoItemPedido = tipoItemPedidoList.get(tipoItemPedidoList.size() - 1);
        assertThat(testTipoItemPedido.getNombreTipo()).isEqualTo(DEFAULT_NOMBRE_TIPO);
    }

    @Test
    @Transactional
    public void createTipoItemPedidoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tipoItemPedidoRepository.findAll().size();

        // Create the TipoItemPedido with an existing ID
        tipoItemPedido.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTipoItemPedidoMockMvc.perform(post("/api/tipo-item-pedidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoItemPedido)))
            .andExpect(status().isBadRequest());

        // Validate the TipoItemPedido in the database
        List<TipoItemPedido> tipoItemPedidoList = tipoItemPedidoRepository.findAll();
        assertThat(tipoItemPedidoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTipoItemPedidos() throws Exception {
        // Initialize the database
        tipoItemPedidoRepository.saveAndFlush(tipoItemPedido);

        // Get all the tipoItemPedidoList
        restTipoItemPedidoMockMvc.perform(get("/api/tipo-item-pedidos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoItemPedido.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombreTipo").value(hasItem(DEFAULT_NOMBRE_TIPO)));
    }
    
    @Test
    @Transactional
    public void getTipoItemPedido() throws Exception {
        // Initialize the database
        tipoItemPedidoRepository.saveAndFlush(tipoItemPedido);

        // Get the tipoItemPedido
        restTipoItemPedidoMockMvc.perform(get("/api/tipo-item-pedidos/{id}", tipoItemPedido.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tipoItemPedido.getId().intValue()))
            .andExpect(jsonPath("$.nombreTipo").value(DEFAULT_NOMBRE_TIPO));
    }

    @Test
    @Transactional
    public void getNonExistingTipoItemPedido() throws Exception {
        // Get the tipoItemPedido
        restTipoItemPedidoMockMvc.perform(get("/api/tipo-item-pedidos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTipoItemPedido() throws Exception {
        // Initialize the database
        tipoItemPedidoRepository.saveAndFlush(tipoItemPedido);

        int databaseSizeBeforeUpdate = tipoItemPedidoRepository.findAll().size();

        // Update the tipoItemPedido
        TipoItemPedido updatedTipoItemPedido = tipoItemPedidoRepository.findById(tipoItemPedido.getId()).get();
        // Disconnect from session so that the updates on updatedTipoItemPedido are not directly saved in db
        em.detach(updatedTipoItemPedido);
        updatedTipoItemPedido
            .nombreTipo(UPDATED_NOMBRE_TIPO);

        restTipoItemPedidoMockMvc.perform(put("/api/tipo-item-pedidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTipoItemPedido)))
            .andExpect(status().isOk());

        // Validate the TipoItemPedido in the database
        List<TipoItemPedido> tipoItemPedidoList = tipoItemPedidoRepository.findAll();
        assertThat(tipoItemPedidoList).hasSize(databaseSizeBeforeUpdate);
        TipoItemPedido testTipoItemPedido = tipoItemPedidoList.get(tipoItemPedidoList.size() - 1);
        assertThat(testTipoItemPedido.getNombreTipo()).isEqualTo(UPDATED_NOMBRE_TIPO);
    }

    @Test
    @Transactional
    public void updateNonExistingTipoItemPedido() throws Exception {
        int databaseSizeBeforeUpdate = tipoItemPedidoRepository.findAll().size();

        // Create the TipoItemPedido

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTipoItemPedidoMockMvc.perform(put("/api/tipo-item-pedidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoItemPedido)))
            .andExpect(status().isBadRequest());

        // Validate the TipoItemPedido in the database
        List<TipoItemPedido> tipoItemPedidoList = tipoItemPedidoRepository.findAll();
        assertThat(tipoItemPedidoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTipoItemPedido() throws Exception {
        // Initialize the database
        tipoItemPedidoRepository.saveAndFlush(tipoItemPedido);

        int databaseSizeBeforeDelete = tipoItemPedidoRepository.findAll().size();

        // Delete the tipoItemPedido
        restTipoItemPedidoMockMvc.perform(delete("/api/tipo-item-pedidos/{id}", tipoItemPedido.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TipoItemPedido> tipoItemPedidoList = tipoItemPedidoRepository.findAll();
        assertThat(tipoItemPedidoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TipoItemPedido.class);
        TipoItemPedido tipoItemPedido1 = new TipoItemPedido();
        tipoItemPedido1.setId(1L);
        TipoItemPedido tipoItemPedido2 = new TipoItemPedido();
        tipoItemPedido2.setId(tipoItemPedido1.getId());
        assertThat(tipoItemPedido1).isEqualTo(tipoItemPedido2);
        tipoItemPedido2.setId(2L);
        assertThat(tipoItemPedido1).isNotEqualTo(tipoItemPedido2);
        tipoItemPedido1.setId(null);
        assertThat(tipoItemPedido1).isNotEqualTo(tipoItemPedido2);
    }
}
