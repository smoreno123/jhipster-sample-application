package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JhipsterSampleApplicationApp;
import com.mycompany.myapp.domain.StatusItemPedido;
import com.mycompany.myapp.repository.StatusItemPedidoRepository;
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
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static com.mycompany.myapp.web.rest.TestUtil.sameInstant;
import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link StatusItemPedidoResource} REST controller.
 */
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class StatusItemPedidoResourceIT {

    private static final Boolean DEFAULT_PREPARADO = false;
    private static final Boolean UPDATED_PREPARADO = true;

    private static final ZonedDateTime DEFAULT_HORA_INICIO = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_HORA_INICIO = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    private static final ZonedDateTime DEFAULT_HORA_FINALIZACION = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_HORA_FINALIZACION = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private StatusItemPedidoRepository statusItemPedidoRepository;

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

    private MockMvc restStatusItemPedidoMockMvc;

    private StatusItemPedido statusItemPedido;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final StatusItemPedidoResource statusItemPedidoResource = new StatusItemPedidoResource(statusItemPedidoRepository);
        this.restStatusItemPedidoMockMvc = MockMvcBuilders.standaloneSetup(statusItemPedidoResource)
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
    public static StatusItemPedido createEntity(EntityManager em) {
        StatusItemPedido statusItemPedido = new StatusItemPedido()
            .preparado(DEFAULT_PREPARADO)
            .horaInicio(DEFAULT_HORA_INICIO)
            .horaFinalizacion(DEFAULT_HORA_FINALIZACION);
        return statusItemPedido;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static StatusItemPedido createUpdatedEntity(EntityManager em) {
        StatusItemPedido statusItemPedido = new StatusItemPedido()
            .preparado(UPDATED_PREPARADO)
            .horaInicio(UPDATED_HORA_INICIO)
            .horaFinalizacion(UPDATED_HORA_FINALIZACION);
        return statusItemPedido;
    }

    @BeforeEach
    public void initTest() {
        statusItemPedido = createEntity(em);
    }

    @Test
    @Transactional
    public void createStatusItemPedido() throws Exception {
        int databaseSizeBeforeCreate = statusItemPedidoRepository.findAll().size();

        // Create the StatusItemPedido
        restStatusItemPedidoMockMvc.perform(post("/api/status-item-pedidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(statusItemPedido)))
            .andExpect(status().isCreated());

        // Validate the StatusItemPedido in the database
        List<StatusItemPedido> statusItemPedidoList = statusItemPedidoRepository.findAll();
        assertThat(statusItemPedidoList).hasSize(databaseSizeBeforeCreate + 1);
        StatusItemPedido testStatusItemPedido = statusItemPedidoList.get(statusItemPedidoList.size() - 1);
        assertThat(testStatusItemPedido.isPreparado()).isEqualTo(DEFAULT_PREPARADO);
        assertThat(testStatusItemPedido.getHoraInicio()).isEqualTo(DEFAULT_HORA_INICIO);
        assertThat(testStatusItemPedido.getHoraFinalizacion()).isEqualTo(DEFAULT_HORA_FINALIZACION);
    }

    @Test
    @Transactional
    public void createStatusItemPedidoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = statusItemPedidoRepository.findAll().size();

        // Create the StatusItemPedido with an existing ID
        statusItemPedido.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStatusItemPedidoMockMvc.perform(post("/api/status-item-pedidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(statusItemPedido)))
            .andExpect(status().isBadRequest());

        // Validate the StatusItemPedido in the database
        List<StatusItemPedido> statusItemPedidoList = statusItemPedidoRepository.findAll();
        assertThat(statusItemPedidoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllStatusItemPedidos() throws Exception {
        // Initialize the database
        statusItemPedidoRepository.saveAndFlush(statusItemPedido);

        // Get all the statusItemPedidoList
        restStatusItemPedidoMockMvc.perform(get("/api/status-item-pedidos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(statusItemPedido.getId().intValue())))
            .andExpect(jsonPath("$.[*].preparado").value(hasItem(DEFAULT_PREPARADO.booleanValue())))
            .andExpect(jsonPath("$.[*].horaInicio").value(hasItem(sameInstant(DEFAULT_HORA_INICIO))))
            .andExpect(jsonPath("$.[*].horaFinalizacion").value(hasItem(sameInstant(DEFAULT_HORA_FINALIZACION))));
    }
    
    @Test
    @Transactional
    public void getStatusItemPedido() throws Exception {
        // Initialize the database
        statusItemPedidoRepository.saveAndFlush(statusItemPedido);

        // Get the statusItemPedido
        restStatusItemPedidoMockMvc.perform(get("/api/status-item-pedidos/{id}", statusItemPedido.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(statusItemPedido.getId().intValue()))
            .andExpect(jsonPath("$.preparado").value(DEFAULT_PREPARADO.booleanValue()))
            .andExpect(jsonPath("$.horaInicio").value(sameInstant(DEFAULT_HORA_INICIO)))
            .andExpect(jsonPath("$.horaFinalizacion").value(sameInstant(DEFAULT_HORA_FINALIZACION)));
    }

    @Test
    @Transactional
    public void getNonExistingStatusItemPedido() throws Exception {
        // Get the statusItemPedido
        restStatusItemPedidoMockMvc.perform(get("/api/status-item-pedidos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStatusItemPedido() throws Exception {
        // Initialize the database
        statusItemPedidoRepository.saveAndFlush(statusItemPedido);

        int databaseSizeBeforeUpdate = statusItemPedidoRepository.findAll().size();

        // Update the statusItemPedido
        StatusItemPedido updatedStatusItemPedido = statusItemPedidoRepository.findById(statusItemPedido.getId()).get();
        // Disconnect from session so that the updates on updatedStatusItemPedido are not directly saved in db
        em.detach(updatedStatusItemPedido);
        updatedStatusItemPedido
            .preparado(UPDATED_PREPARADO)
            .horaInicio(UPDATED_HORA_INICIO)
            .horaFinalizacion(UPDATED_HORA_FINALIZACION);

        restStatusItemPedidoMockMvc.perform(put("/api/status-item-pedidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedStatusItemPedido)))
            .andExpect(status().isOk());

        // Validate the StatusItemPedido in the database
        List<StatusItemPedido> statusItemPedidoList = statusItemPedidoRepository.findAll();
        assertThat(statusItemPedidoList).hasSize(databaseSizeBeforeUpdate);
        StatusItemPedido testStatusItemPedido = statusItemPedidoList.get(statusItemPedidoList.size() - 1);
        assertThat(testStatusItemPedido.isPreparado()).isEqualTo(UPDATED_PREPARADO);
        assertThat(testStatusItemPedido.getHoraInicio()).isEqualTo(UPDATED_HORA_INICIO);
        assertThat(testStatusItemPedido.getHoraFinalizacion()).isEqualTo(UPDATED_HORA_FINALIZACION);
    }

    @Test
    @Transactional
    public void updateNonExistingStatusItemPedido() throws Exception {
        int databaseSizeBeforeUpdate = statusItemPedidoRepository.findAll().size();

        // Create the StatusItemPedido

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStatusItemPedidoMockMvc.perform(put("/api/status-item-pedidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(statusItemPedido)))
            .andExpect(status().isBadRequest());

        // Validate the StatusItemPedido in the database
        List<StatusItemPedido> statusItemPedidoList = statusItemPedidoRepository.findAll();
        assertThat(statusItemPedidoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteStatusItemPedido() throws Exception {
        // Initialize the database
        statusItemPedidoRepository.saveAndFlush(statusItemPedido);

        int databaseSizeBeforeDelete = statusItemPedidoRepository.findAll().size();

        // Delete the statusItemPedido
        restStatusItemPedidoMockMvc.perform(delete("/api/status-item-pedidos/{id}", statusItemPedido.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<StatusItemPedido> statusItemPedidoList = statusItemPedidoRepository.findAll();
        assertThat(statusItemPedidoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(StatusItemPedido.class);
        StatusItemPedido statusItemPedido1 = new StatusItemPedido();
        statusItemPedido1.setId(1L);
        StatusItemPedido statusItemPedido2 = new StatusItemPedido();
        statusItemPedido2.setId(statusItemPedido1.getId());
        assertThat(statusItemPedido1).isEqualTo(statusItemPedido2);
        statusItemPedido2.setId(2L);
        assertThat(statusItemPedido1).isNotEqualTo(statusItemPedido2);
        statusItemPedido1.setId(null);
        assertThat(statusItemPedido1).isNotEqualTo(statusItemPedido2);
    }
}
