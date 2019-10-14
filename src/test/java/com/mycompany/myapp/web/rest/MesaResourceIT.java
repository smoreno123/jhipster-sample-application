package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JhipsterSampleApplicationApp;
import com.mycompany.myapp.domain.Mesa;
import com.mycompany.myapp.repository.MesaRepository;
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
 * Integration tests for the {@link MesaResource} REST controller.
 */
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class MesaResourceIT {

    private static final Integer DEFAULT_NUM_MESA = 1;
    private static final Integer UPDATED_NUM_MESA = 2;

    private static final Integer DEFAULT_CAPACIDAD = 1;
    private static final Integer UPDATED_CAPACIDAD = 2;

    @Autowired
    private MesaRepository mesaRepository;

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

    private MockMvc restMesaMockMvc;

    private Mesa mesa;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MesaResource mesaResource = new MesaResource(mesaRepository);
        this.restMesaMockMvc = MockMvcBuilders.standaloneSetup(mesaResource)
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
    public static Mesa createEntity(EntityManager em) {
        Mesa mesa = new Mesa()
            .numMesa(DEFAULT_NUM_MESA)
            .capacidad(DEFAULT_CAPACIDAD);
        return mesa;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Mesa createUpdatedEntity(EntityManager em) {
        Mesa mesa = new Mesa()
            .numMesa(UPDATED_NUM_MESA)
            .capacidad(UPDATED_CAPACIDAD);
        return mesa;
    }

    @BeforeEach
    public void initTest() {
        mesa = createEntity(em);
    }

    @Test
    @Transactional
    public void createMesa() throws Exception {
        int databaseSizeBeforeCreate = mesaRepository.findAll().size();

        // Create the Mesa
        restMesaMockMvc.perform(post("/api/mesas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mesa)))
            .andExpect(status().isCreated());

        // Validate the Mesa in the database
        List<Mesa> mesaList = mesaRepository.findAll();
        assertThat(mesaList).hasSize(databaseSizeBeforeCreate + 1);
        Mesa testMesa = mesaList.get(mesaList.size() - 1);
        assertThat(testMesa.getNumMesa()).isEqualTo(DEFAULT_NUM_MESA);
        assertThat(testMesa.getCapacidad()).isEqualTo(DEFAULT_CAPACIDAD);
    }

    @Test
    @Transactional
    public void createMesaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = mesaRepository.findAll().size();

        // Create the Mesa with an existing ID
        mesa.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMesaMockMvc.perform(post("/api/mesas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mesa)))
            .andExpect(status().isBadRequest());

        // Validate the Mesa in the database
        List<Mesa> mesaList = mesaRepository.findAll();
        assertThat(mesaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllMesas() throws Exception {
        // Initialize the database
        mesaRepository.saveAndFlush(mesa);

        // Get all the mesaList
        restMesaMockMvc.perform(get("/api/mesas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(mesa.getId().intValue())))
            .andExpect(jsonPath("$.[*].numMesa").value(hasItem(DEFAULT_NUM_MESA)))
            .andExpect(jsonPath("$.[*].capacidad").value(hasItem(DEFAULT_CAPACIDAD)));
    }
    
    @Test
    @Transactional
    public void getMesa() throws Exception {
        // Initialize the database
        mesaRepository.saveAndFlush(mesa);

        // Get the mesa
        restMesaMockMvc.perform(get("/api/mesas/{id}", mesa.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(mesa.getId().intValue()))
            .andExpect(jsonPath("$.numMesa").value(DEFAULT_NUM_MESA))
            .andExpect(jsonPath("$.capacidad").value(DEFAULT_CAPACIDAD));
    }

    @Test
    @Transactional
    public void getNonExistingMesa() throws Exception {
        // Get the mesa
        restMesaMockMvc.perform(get("/api/mesas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMesa() throws Exception {
        // Initialize the database
        mesaRepository.saveAndFlush(mesa);

        int databaseSizeBeforeUpdate = mesaRepository.findAll().size();

        // Update the mesa
        Mesa updatedMesa = mesaRepository.findById(mesa.getId()).get();
        // Disconnect from session so that the updates on updatedMesa are not directly saved in db
        em.detach(updatedMesa);
        updatedMesa
            .numMesa(UPDATED_NUM_MESA)
            .capacidad(UPDATED_CAPACIDAD);

        restMesaMockMvc.perform(put("/api/mesas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedMesa)))
            .andExpect(status().isOk());

        // Validate the Mesa in the database
        List<Mesa> mesaList = mesaRepository.findAll();
        assertThat(mesaList).hasSize(databaseSizeBeforeUpdate);
        Mesa testMesa = mesaList.get(mesaList.size() - 1);
        assertThat(testMesa.getNumMesa()).isEqualTo(UPDATED_NUM_MESA);
        assertThat(testMesa.getCapacidad()).isEqualTo(UPDATED_CAPACIDAD);
    }

    @Test
    @Transactional
    public void updateNonExistingMesa() throws Exception {
        int databaseSizeBeforeUpdate = mesaRepository.findAll().size();

        // Create the Mesa

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restMesaMockMvc.perform(put("/api/mesas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(mesa)))
            .andExpect(status().isBadRequest());

        // Validate the Mesa in the database
        List<Mesa> mesaList = mesaRepository.findAll();
        assertThat(mesaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMesa() throws Exception {
        // Initialize the database
        mesaRepository.saveAndFlush(mesa);

        int databaseSizeBeforeDelete = mesaRepository.findAll().size();

        // Delete the mesa
        restMesaMockMvc.perform(delete("/api/mesas/{id}", mesa.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Mesa> mesaList = mesaRepository.findAll();
        assertThat(mesaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Mesa.class);
        Mesa mesa1 = new Mesa();
        mesa1.setId(1L);
        Mesa mesa2 = new Mesa();
        mesa2.setId(mesa1.getId());
        assertThat(mesa1).isEqualTo(mesa2);
        mesa2.setId(2L);
        assertThat(mesa1).isNotEqualTo(mesa2);
        mesa1.setId(null);
        assertThat(mesa1).isNotEqualTo(mesa2);
    }
}
