package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JhipsterSampleApplicationApp;
import com.mycompany.myapp.domain.Pedido;
import com.mycompany.myapp.repository.PedidoRepository;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;

import static com.mycompany.myapp.web.rest.TestUtil.sameInstant;
import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link PedidoResource} REST controller.
 */
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class PedidoResourceIT {

    private static final Integer DEFAULT_NUM_PEDIDO = 1;
    private static final Integer UPDATED_NUM_PEDIDO = 2;

    private static final ZonedDateTime DEFAULT_FECHA_PEDIDO = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_FECHA_PEDIDO = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final BigDecimal DEFAULT_PRECIO = new BigDecimal(1);
    private static final BigDecimal UPDATED_PRECIO = new BigDecimal(2);

    private static final String DEFAULT_OBSERVACIONES_PRECIO = "AAAAAAAAAA";
    private static final String UPDATED_OBSERVACIONES_PRECIO = "BBBBBBBBBB";

    @Autowired
    private PedidoRepository pedidoRepository;

    @Mock
    private PedidoRepository pedidoRepositoryMock;

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

    private MockMvc restPedidoMockMvc;

    private Pedido pedido;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PedidoResource pedidoResource = new PedidoResource(pedidoRepository);
        this.restPedidoMockMvc = MockMvcBuilders.standaloneSetup(pedidoResource)
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
    public static Pedido createEntity(EntityManager em) {
        Pedido pedido = new Pedido()
            .numPedido(DEFAULT_NUM_PEDIDO)
            .fechaPedido(DEFAULT_FECHA_PEDIDO)
            .precio(DEFAULT_PRECIO)
            .observacionesPrecio(DEFAULT_OBSERVACIONES_PRECIO);
        return pedido;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Pedido createUpdatedEntity(EntityManager em) {
        Pedido pedido = new Pedido()
            .numPedido(UPDATED_NUM_PEDIDO)
            .fechaPedido(UPDATED_FECHA_PEDIDO)
            .precio(UPDATED_PRECIO)
            .observacionesPrecio(UPDATED_OBSERVACIONES_PRECIO);
        return pedido;
    }

    @BeforeEach
    public void initTest() {
        pedido = createEntity(em);
    }

    @Test
    @Transactional
    public void createPedido() throws Exception {
        int databaseSizeBeforeCreate = pedidoRepository.findAll().size();

        // Create the Pedido
        restPedidoMockMvc.perform(post("/api/pedidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pedido)))
            .andExpect(status().isCreated());

        // Validate the Pedido in the database
        List<Pedido> pedidoList = pedidoRepository.findAll();
        assertThat(pedidoList).hasSize(databaseSizeBeforeCreate + 1);
        Pedido testPedido = pedidoList.get(pedidoList.size() - 1);
        assertThat(testPedido.getNumPedido()).isEqualTo(DEFAULT_NUM_PEDIDO);
        assertThat(testPedido.getFechaPedido()).isEqualTo(DEFAULT_FECHA_PEDIDO);
        assertThat(testPedido.getPrecio()).isEqualTo(DEFAULT_PRECIO);
        assertThat(testPedido.getObservacionesPrecio()).isEqualTo(DEFAULT_OBSERVACIONES_PRECIO);
    }

    @Test
    @Transactional
    public void createPedidoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = pedidoRepository.findAll().size();

        // Create the Pedido with an existing ID
        pedido.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPedidoMockMvc.perform(post("/api/pedidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pedido)))
            .andExpect(status().isBadRequest());

        // Validate the Pedido in the database
        List<Pedido> pedidoList = pedidoRepository.findAll();
        assertThat(pedidoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllPedidos() throws Exception {
        // Initialize the database
        pedidoRepository.saveAndFlush(pedido);

        // Get all the pedidoList
        restPedidoMockMvc.perform(get("/api/pedidos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(pedido.getId().intValue())))
            .andExpect(jsonPath("$.[*].numPedido").value(hasItem(DEFAULT_NUM_PEDIDO)))
            .andExpect(jsonPath("$.[*].fechaPedido").value(hasItem(sameInstant(DEFAULT_FECHA_PEDIDO))))
            .andExpect(jsonPath("$.[*].precio").value(hasItem(DEFAULT_PRECIO.intValue())))
            .andExpect(jsonPath("$.[*].observacionesPrecio").value(hasItem(DEFAULT_OBSERVACIONES_PRECIO)));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllPedidosWithEagerRelationshipsIsEnabled() throws Exception {
        PedidoResource pedidoResource = new PedidoResource(pedidoRepositoryMock);
        when(pedidoRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restPedidoMockMvc = MockMvcBuilders.standaloneSetup(pedidoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restPedidoMockMvc.perform(get("/api/pedidos?eagerload=true"))
        .andExpect(status().isOk());

        verify(pedidoRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllPedidosWithEagerRelationshipsIsNotEnabled() throws Exception {
        PedidoResource pedidoResource = new PedidoResource(pedidoRepositoryMock);
            when(pedidoRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restPedidoMockMvc = MockMvcBuilders.standaloneSetup(pedidoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restPedidoMockMvc.perform(get("/api/pedidos?eagerload=true"))
        .andExpect(status().isOk());

            verify(pedidoRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getPedido() throws Exception {
        // Initialize the database
        pedidoRepository.saveAndFlush(pedido);

        // Get the pedido
        restPedidoMockMvc.perform(get("/api/pedidos/{id}", pedido.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(pedido.getId().intValue()))
            .andExpect(jsonPath("$.numPedido").value(DEFAULT_NUM_PEDIDO))
            .andExpect(jsonPath("$.fechaPedido").value(sameInstant(DEFAULT_FECHA_PEDIDO)))
            .andExpect(jsonPath("$.precio").value(DEFAULT_PRECIO.intValue()))
            .andExpect(jsonPath("$.observacionesPrecio").value(DEFAULT_OBSERVACIONES_PRECIO));
    }

    @Test
    @Transactional
    public void getNonExistingPedido() throws Exception {
        // Get the pedido
        restPedidoMockMvc.perform(get("/api/pedidos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePedido() throws Exception {
        // Initialize the database
        pedidoRepository.saveAndFlush(pedido);

        int databaseSizeBeforeUpdate = pedidoRepository.findAll().size();

        // Update the pedido
        Pedido updatedPedido = pedidoRepository.findById(pedido.getId()).get();
        // Disconnect from session so that the updates on updatedPedido are not directly saved in db
        em.detach(updatedPedido);
        updatedPedido
            .numPedido(UPDATED_NUM_PEDIDO)
            .fechaPedido(UPDATED_FECHA_PEDIDO)
            .precio(UPDATED_PRECIO)
            .observacionesPrecio(UPDATED_OBSERVACIONES_PRECIO);

        restPedidoMockMvc.perform(put("/api/pedidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPedido)))
            .andExpect(status().isOk());

        // Validate the Pedido in the database
        List<Pedido> pedidoList = pedidoRepository.findAll();
        assertThat(pedidoList).hasSize(databaseSizeBeforeUpdate);
        Pedido testPedido = pedidoList.get(pedidoList.size() - 1);
        assertThat(testPedido.getNumPedido()).isEqualTo(UPDATED_NUM_PEDIDO);
        assertThat(testPedido.getFechaPedido()).isEqualTo(UPDATED_FECHA_PEDIDO);
        assertThat(testPedido.getPrecio()).isEqualTo(UPDATED_PRECIO);
        assertThat(testPedido.getObservacionesPrecio()).isEqualTo(UPDATED_OBSERVACIONES_PRECIO);
    }

    @Test
    @Transactional
    public void updateNonExistingPedido() throws Exception {
        int databaseSizeBeforeUpdate = pedidoRepository.findAll().size();

        // Create the Pedido

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPedidoMockMvc.perform(put("/api/pedidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(pedido)))
            .andExpect(status().isBadRequest());

        // Validate the Pedido in the database
        List<Pedido> pedidoList = pedidoRepository.findAll();
        assertThat(pedidoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePedido() throws Exception {
        // Initialize the database
        pedidoRepository.saveAndFlush(pedido);

        int databaseSizeBeforeDelete = pedidoRepository.findAll().size();

        // Delete the pedido
        restPedidoMockMvc.perform(delete("/api/pedidos/{id}", pedido.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Pedido> pedidoList = pedidoRepository.findAll();
        assertThat(pedidoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Pedido.class);
        Pedido pedido1 = new Pedido();
        pedido1.setId(1L);
        Pedido pedido2 = new Pedido();
        pedido2.setId(pedido1.getId());
        assertThat(pedido1).isEqualTo(pedido2);
        pedido2.setId(2L);
        assertThat(pedido1).isNotEqualTo(pedido2);
        pedido1.setId(null);
        assertThat(pedido1).isNotEqualTo(pedido2);
    }
}
