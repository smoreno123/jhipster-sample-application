package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JhipsterSampleApplicationApp;
import com.mycompany.myapp.domain.Ingrediente;
import com.mycompany.myapp.repository.IngredienteRepository;
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
 * Integration tests for the {@link IngredienteResource} REST controller.
 */
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class IngredienteResourceIT {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final Boolean DEFAULT_VEGETARIANO = false;
    private static final Boolean UPDATED_VEGETARIANO = true;

    private static final Boolean DEFAULT_VEGANO = false;
    private static final Boolean UPDATED_VEGANO = true;

    private static final Integer DEFAULT_KCAL = 1;
    private static final Integer UPDATED_KCAL = 2;

    @Autowired
    private IngredienteRepository ingredienteRepository;

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

    private MockMvc restIngredienteMockMvc;

    private Ingrediente ingrediente;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final IngredienteResource ingredienteResource = new IngredienteResource(ingredienteRepository);
        this.restIngredienteMockMvc = MockMvcBuilders.standaloneSetup(ingredienteResource)
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
    public static Ingrediente createEntity(EntityManager em) {
        Ingrediente ingrediente = new Ingrediente()
            .nombre(DEFAULT_NOMBRE)
            .vegetariano(DEFAULT_VEGETARIANO)
            .vegano(DEFAULT_VEGANO)
            .kcal(DEFAULT_KCAL);
        return ingrediente;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Ingrediente createUpdatedEntity(EntityManager em) {
        Ingrediente ingrediente = new Ingrediente()
            .nombre(UPDATED_NOMBRE)
            .vegetariano(UPDATED_VEGETARIANO)
            .vegano(UPDATED_VEGANO)
            .kcal(UPDATED_KCAL);
        return ingrediente;
    }

    @BeforeEach
    public void initTest() {
        ingrediente = createEntity(em);
    }

    @Test
    @Transactional
    public void createIngrediente() throws Exception {
        int databaseSizeBeforeCreate = ingredienteRepository.findAll().size();

        // Create the Ingrediente
        restIngredienteMockMvc.perform(post("/api/ingredientes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ingrediente)))
            .andExpect(status().isCreated());

        // Validate the Ingrediente in the database
        List<Ingrediente> ingredienteList = ingredienteRepository.findAll();
        assertThat(ingredienteList).hasSize(databaseSizeBeforeCreate + 1);
        Ingrediente testIngrediente = ingredienteList.get(ingredienteList.size() - 1);
        assertThat(testIngrediente.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testIngrediente.isVegetariano()).isEqualTo(DEFAULT_VEGETARIANO);
        assertThat(testIngrediente.isVegano()).isEqualTo(DEFAULT_VEGANO);
        assertThat(testIngrediente.getKcal()).isEqualTo(DEFAULT_KCAL);
    }

    @Test
    @Transactional
    public void createIngredienteWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ingredienteRepository.findAll().size();

        // Create the Ingrediente with an existing ID
        ingrediente.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restIngredienteMockMvc.perform(post("/api/ingredientes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ingrediente)))
            .andExpect(status().isBadRequest());

        // Validate the Ingrediente in the database
        List<Ingrediente> ingredienteList = ingredienteRepository.findAll();
        assertThat(ingredienteList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllIngredientes() throws Exception {
        // Initialize the database
        ingredienteRepository.saveAndFlush(ingrediente);

        // Get all the ingredienteList
        restIngredienteMockMvc.perform(get("/api/ingredientes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ingrediente.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)))
            .andExpect(jsonPath("$.[*].vegetariano").value(hasItem(DEFAULT_VEGETARIANO.booleanValue())))
            .andExpect(jsonPath("$.[*].vegano").value(hasItem(DEFAULT_VEGANO.booleanValue())))
            .andExpect(jsonPath("$.[*].kcal").value(hasItem(DEFAULT_KCAL)));
    }
    
    @Test
    @Transactional
    public void getIngrediente() throws Exception {
        // Initialize the database
        ingredienteRepository.saveAndFlush(ingrediente);

        // Get the ingrediente
        restIngredienteMockMvc.perform(get("/api/ingredientes/{id}", ingrediente.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ingrediente.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE))
            .andExpect(jsonPath("$.vegetariano").value(DEFAULT_VEGETARIANO.booleanValue()))
            .andExpect(jsonPath("$.vegano").value(DEFAULT_VEGANO.booleanValue()))
            .andExpect(jsonPath("$.kcal").value(DEFAULT_KCAL));
    }

    @Test
    @Transactional
    public void getNonExistingIngrediente() throws Exception {
        // Get the ingrediente
        restIngredienteMockMvc.perform(get("/api/ingredientes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateIngrediente() throws Exception {
        // Initialize the database
        ingredienteRepository.saveAndFlush(ingrediente);

        int databaseSizeBeforeUpdate = ingredienteRepository.findAll().size();

        // Update the ingrediente
        Ingrediente updatedIngrediente = ingredienteRepository.findById(ingrediente.getId()).get();
        // Disconnect from session so that the updates on updatedIngrediente are not directly saved in db
        em.detach(updatedIngrediente);
        updatedIngrediente
            .nombre(UPDATED_NOMBRE)
            .vegetariano(UPDATED_VEGETARIANO)
            .vegano(UPDATED_VEGANO)
            .kcal(UPDATED_KCAL);

        restIngredienteMockMvc.perform(put("/api/ingredientes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedIngrediente)))
            .andExpect(status().isOk());

        // Validate the Ingrediente in the database
        List<Ingrediente> ingredienteList = ingredienteRepository.findAll();
        assertThat(ingredienteList).hasSize(databaseSizeBeforeUpdate);
        Ingrediente testIngrediente = ingredienteList.get(ingredienteList.size() - 1);
        assertThat(testIngrediente.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testIngrediente.isVegetariano()).isEqualTo(UPDATED_VEGETARIANO);
        assertThat(testIngrediente.isVegano()).isEqualTo(UPDATED_VEGANO);
        assertThat(testIngrediente.getKcal()).isEqualTo(UPDATED_KCAL);
    }

    @Test
    @Transactional
    public void updateNonExistingIngrediente() throws Exception {
        int databaseSizeBeforeUpdate = ingredienteRepository.findAll().size();

        // Create the Ingrediente

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restIngredienteMockMvc.perform(put("/api/ingredientes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ingrediente)))
            .andExpect(status().isBadRequest());

        // Validate the Ingrediente in the database
        List<Ingrediente> ingredienteList = ingredienteRepository.findAll();
        assertThat(ingredienteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteIngrediente() throws Exception {
        // Initialize the database
        ingredienteRepository.saveAndFlush(ingrediente);

        int databaseSizeBeforeDelete = ingredienteRepository.findAll().size();

        // Delete the ingrediente
        restIngredienteMockMvc.perform(delete("/api/ingredientes/{id}", ingrediente.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Ingrediente> ingredienteList = ingredienteRepository.findAll();
        assertThat(ingredienteList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Ingrediente.class);
        Ingrediente ingrediente1 = new Ingrediente();
        ingrediente1.setId(1L);
        Ingrediente ingrediente2 = new Ingrediente();
        ingrediente2.setId(ingrediente1.getId());
        assertThat(ingrediente1).isEqualTo(ingrediente2);
        ingrediente2.setId(2L);
        assertThat(ingrediente1).isNotEqualTo(ingrediente2);
        ingrediente1.setId(null);
        assertThat(ingrediente1).isNotEqualTo(ingrediente2);
    }
}
