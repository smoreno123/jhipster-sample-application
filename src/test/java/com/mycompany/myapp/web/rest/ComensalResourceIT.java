package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JhipsterSampleApplicationApp;
import com.mycompany.myapp.domain.Comensal;
import com.mycompany.myapp.repository.ComensalRepository;
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
 * Integration tests for the {@link ComensalResource} REST controller.
 */
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class ComensalResourceIT {

    private static final String DEFAULT_DNI = "AAAAAAAAAA";
    private static final String UPDATED_DNI = "BBBBBBBBBB";

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    @Autowired
    private ComensalRepository comensalRepository;

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

    private MockMvc restComensalMockMvc;

    private Comensal comensal;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ComensalResource comensalResource = new ComensalResource(comensalRepository);
        this.restComensalMockMvc = MockMvcBuilders.standaloneSetup(comensalResource)
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
    public static Comensal createEntity(EntityManager em) {
        Comensal comensal = new Comensal()
            .dni(DEFAULT_DNI)
            .nombre(DEFAULT_NOMBRE);
        return comensal;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Comensal createUpdatedEntity(EntityManager em) {
        Comensal comensal = new Comensal()
            .dni(UPDATED_DNI)
            .nombre(UPDATED_NOMBRE);
        return comensal;
    }

    @BeforeEach
    public void initTest() {
        comensal = createEntity(em);
    }

    @Test
    @Transactional
    public void createComensal() throws Exception {
        int databaseSizeBeforeCreate = comensalRepository.findAll().size();

        // Create the Comensal
        restComensalMockMvc.perform(post("/api/comensals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(comensal)))
            .andExpect(status().isCreated());

        // Validate the Comensal in the database
        List<Comensal> comensalList = comensalRepository.findAll();
        assertThat(comensalList).hasSize(databaseSizeBeforeCreate + 1);
        Comensal testComensal = comensalList.get(comensalList.size() - 1);
        assertThat(testComensal.getDni()).isEqualTo(DEFAULT_DNI);
        assertThat(testComensal.getNombre()).isEqualTo(DEFAULT_NOMBRE);
    }

    @Test
    @Transactional
    public void createComensalWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = comensalRepository.findAll().size();

        // Create the Comensal with an existing ID
        comensal.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restComensalMockMvc.perform(post("/api/comensals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(comensal)))
            .andExpect(status().isBadRequest());

        // Validate the Comensal in the database
        List<Comensal> comensalList = comensalRepository.findAll();
        assertThat(comensalList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllComensals() throws Exception {
        // Initialize the database
        comensalRepository.saveAndFlush(comensal);

        // Get all the comensalList
        restComensalMockMvc.perform(get("/api/comensals?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(comensal.getId().intValue())))
            .andExpect(jsonPath("$.[*].dni").value(hasItem(DEFAULT_DNI)))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)));
    }
    
    @Test
    @Transactional
    public void getComensal() throws Exception {
        // Initialize the database
        comensalRepository.saveAndFlush(comensal);

        // Get the comensal
        restComensalMockMvc.perform(get("/api/comensals/{id}", comensal.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(comensal.getId().intValue()))
            .andExpect(jsonPath("$.dni").value(DEFAULT_DNI))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE));
    }

    @Test
    @Transactional
    public void getNonExistingComensal() throws Exception {
        // Get the comensal
        restComensalMockMvc.perform(get("/api/comensals/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateComensal() throws Exception {
        // Initialize the database
        comensalRepository.saveAndFlush(comensal);

        int databaseSizeBeforeUpdate = comensalRepository.findAll().size();

        // Update the comensal
        Comensal updatedComensal = comensalRepository.findById(comensal.getId()).get();
        // Disconnect from session so that the updates on updatedComensal are not directly saved in db
        em.detach(updatedComensal);
        updatedComensal
            .dni(UPDATED_DNI)
            .nombre(UPDATED_NOMBRE);

        restComensalMockMvc.perform(put("/api/comensals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedComensal)))
            .andExpect(status().isOk());

        // Validate the Comensal in the database
        List<Comensal> comensalList = comensalRepository.findAll();
        assertThat(comensalList).hasSize(databaseSizeBeforeUpdate);
        Comensal testComensal = comensalList.get(comensalList.size() - 1);
        assertThat(testComensal.getDni()).isEqualTo(UPDATED_DNI);
        assertThat(testComensal.getNombre()).isEqualTo(UPDATED_NOMBRE);
    }

    @Test
    @Transactional
    public void updateNonExistingComensal() throws Exception {
        int databaseSizeBeforeUpdate = comensalRepository.findAll().size();

        // Create the Comensal

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restComensalMockMvc.perform(put("/api/comensals")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(comensal)))
            .andExpect(status().isBadRequest());

        // Validate the Comensal in the database
        List<Comensal> comensalList = comensalRepository.findAll();
        assertThat(comensalList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteComensal() throws Exception {
        // Initialize the database
        comensalRepository.saveAndFlush(comensal);

        int databaseSizeBeforeDelete = comensalRepository.findAll().size();

        // Delete the comensal
        restComensalMockMvc.perform(delete("/api/comensals/{id}", comensal.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Comensal> comensalList = comensalRepository.findAll();
        assertThat(comensalList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Comensal.class);
        Comensal comensal1 = new Comensal();
        comensal1.setId(1L);
        Comensal comensal2 = new Comensal();
        comensal2.setId(comensal1.getId());
        assertThat(comensal1).isEqualTo(comensal2);
        comensal2.setId(2L);
        assertThat(comensal1).isNotEqualTo(comensal2);
        comensal1.setId(null);
        assertThat(comensal1).isNotEqualTo(comensal2);
    }
}
