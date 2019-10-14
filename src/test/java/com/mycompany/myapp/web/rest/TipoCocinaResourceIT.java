package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JhipsterSampleApplicationApp;
import com.mycompany.myapp.domain.TipoCocina;
import com.mycompany.myapp.repository.TipoCocinaRepository;
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
 * Integration tests for the {@link TipoCocinaResource} REST controller.
 */
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class TipoCocinaResourceIT {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    @Autowired
    private TipoCocinaRepository tipoCocinaRepository;

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

    private MockMvc restTipoCocinaMockMvc;

    private TipoCocina tipoCocina;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final TipoCocinaResource tipoCocinaResource = new TipoCocinaResource(tipoCocinaRepository);
        this.restTipoCocinaMockMvc = MockMvcBuilders.standaloneSetup(tipoCocinaResource)
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
    public static TipoCocina createEntity(EntityManager em) {
        TipoCocina tipoCocina = new TipoCocina()
            .nombre(DEFAULT_NOMBRE);
        return tipoCocina;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static TipoCocina createUpdatedEntity(EntityManager em) {
        TipoCocina tipoCocina = new TipoCocina()
            .nombre(UPDATED_NOMBRE);
        return tipoCocina;
    }

    @BeforeEach
    public void initTest() {
        tipoCocina = createEntity(em);
    }

    @Test
    @Transactional
    public void createTipoCocina() throws Exception {
        int databaseSizeBeforeCreate = tipoCocinaRepository.findAll().size();

        // Create the TipoCocina
        restTipoCocinaMockMvc.perform(post("/api/tipo-cocinas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoCocina)))
            .andExpect(status().isCreated());

        // Validate the TipoCocina in the database
        List<TipoCocina> tipoCocinaList = tipoCocinaRepository.findAll();
        assertThat(tipoCocinaList).hasSize(databaseSizeBeforeCreate + 1);
        TipoCocina testTipoCocina = tipoCocinaList.get(tipoCocinaList.size() - 1);
        assertThat(testTipoCocina.getNombre()).isEqualTo(DEFAULT_NOMBRE);
    }

    @Test
    @Transactional
    public void createTipoCocinaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = tipoCocinaRepository.findAll().size();

        // Create the TipoCocina with an existing ID
        tipoCocina.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTipoCocinaMockMvc.perform(post("/api/tipo-cocinas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoCocina)))
            .andExpect(status().isBadRequest());

        // Validate the TipoCocina in the database
        List<TipoCocina> tipoCocinaList = tipoCocinaRepository.findAll();
        assertThat(tipoCocinaList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllTipoCocinas() throws Exception {
        // Initialize the database
        tipoCocinaRepository.saveAndFlush(tipoCocina);

        // Get all the tipoCocinaList
        restTipoCocinaMockMvc.perform(get("/api/tipo-cocinas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tipoCocina.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)));
    }
    
    @Test
    @Transactional
    public void getTipoCocina() throws Exception {
        // Initialize the database
        tipoCocinaRepository.saveAndFlush(tipoCocina);

        // Get the tipoCocina
        restTipoCocinaMockMvc.perform(get("/api/tipo-cocinas/{id}", tipoCocina.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(tipoCocina.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE));
    }

    @Test
    @Transactional
    public void getNonExistingTipoCocina() throws Exception {
        // Get the tipoCocina
        restTipoCocinaMockMvc.perform(get("/api/tipo-cocinas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTipoCocina() throws Exception {
        // Initialize the database
        tipoCocinaRepository.saveAndFlush(tipoCocina);

        int databaseSizeBeforeUpdate = tipoCocinaRepository.findAll().size();

        // Update the tipoCocina
        TipoCocina updatedTipoCocina = tipoCocinaRepository.findById(tipoCocina.getId()).get();
        // Disconnect from session so that the updates on updatedTipoCocina are not directly saved in db
        em.detach(updatedTipoCocina);
        updatedTipoCocina
            .nombre(UPDATED_NOMBRE);

        restTipoCocinaMockMvc.perform(put("/api/tipo-cocinas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedTipoCocina)))
            .andExpect(status().isOk());

        // Validate the TipoCocina in the database
        List<TipoCocina> tipoCocinaList = tipoCocinaRepository.findAll();
        assertThat(tipoCocinaList).hasSize(databaseSizeBeforeUpdate);
        TipoCocina testTipoCocina = tipoCocinaList.get(tipoCocinaList.size() - 1);
        assertThat(testTipoCocina.getNombre()).isEqualTo(UPDATED_NOMBRE);
    }

    @Test
    @Transactional
    public void updateNonExistingTipoCocina() throws Exception {
        int databaseSizeBeforeUpdate = tipoCocinaRepository.findAll().size();

        // Create the TipoCocina

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTipoCocinaMockMvc.perform(put("/api/tipo-cocinas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(tipoCocina)))
            .andExpect(status().isBadRequest());

        // Validate the TipoCocina in the database
        List<TipoCocina> tipoCocinaList = tipoCocinaRepository.findAll();
        assertThat(tipoCocinaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTipoCocina() throws Exception {
        // Initialize the database
        tipoCocinaRepository.saveAndFlush(tipoCocina);

        int databaseSizeBeforeDelete = tipoCocinaRepository.findAll().size();

        // Delete the tipoCocina
        restTipoCocinaMockMvc.perform(delete("/api/tipo-cocinas/{id}", tipoCocina.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<TipoCocina> tipoCocinaList = tipoCocinaRepository.findAll();
        assertThat(tipoCocinaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TipoCocina.class);
        TipoCocina tipoCocina1 = new TipoCocina();
        tipoCocina1.setId(1L);
        TipoCocina tipoCocina2 = new TipoCocina();
        tipoCocina2.setId(tipoCocina1.getId());
        assertThat(tipoCocina1).isEqualTo(tipoCocina2);
        tipoCocina2.setId(2L);
        assertThat(tipoCocina1).isNotEqualTo(tipoCocina2);
        tipoCocina1.setId(null);
        assertThat(tipoCocina1).isNotEqualTo(tipoCocina2);
    }
}
