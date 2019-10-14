package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JhipsterSampleApplicationApp;
import com.mycompany.myapp.domain.ItemPedido;
import com.mycompany.myapp.repository.ItemPedidoRepository;
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
import java.util.ArrayList;
import java.util.List;

import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ItemPedidoResource} REST controller.
 */
@SpringBootTest(classes = JhipsterSampleApplicationApp.class)
public class ItemPedidoResourceIT {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    private static final BigDecimal DEFAULT_PRECIO = new BigDecimal(1);
    private static final BigDecimal UPDATED_PRECIO = new BigDecimal(2);

    private static final Integer DEFAULT_TIEMPO_PREPARACION = 1;
    private static final Integer UPDATED_TIEMPO_PREPARACION = 2;

    @Autowired
    private ItemPedidoRepository itemPedidoRepository;

    @Mock
    private ItemPedidoRepository itemPedidoRepositoryMock;

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

    private MockMvc restItemPedidoMockMvc;

    private ItemPedido itemPedido;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ItemPedidoResource itemPedidoResource = new ItemPedidoResource(itemPedidoRepository);
        this.restItemPedidoMockMvc = MockMvcBuilders.standaloneSetup(itemPedidoResource)
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
    public static ItemPedido createEntity(EntityManager em) {
        ItemPedido itemPedido = new ItemPedido()
            .nombre(DEFAULT_NOMBRE)
            .descripcion(DEFAULT_DESCRIPCION)
            .precio(DEFAULT_PRECIO)
            .tiempoPreparacion(DEFAULT_TIEMPO_PREPARACION);
        return itemPedido;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ItemPedido createUpdatedEntity(EntityManager em) {
        ItemPedido itemPedido = new ItemPedido()
            .nombre(UPDATED_NOMBRE)
            .descripcion(UPDATED_DESCRIPCION)
            .precio(UPDATED_PRECIO)
            .tiempoPreparacion(UPDATED_TIEMPO_PREPARACION);
        return itemPedido;
    }

    @BeforeEach
    public void initTest() {
        itemPedido = createEntity(em);
    }

    @Test
    @Transactional
    public void createItemPedido() throws Exception {
        int databaseSizeBeforeCreate = itemPedidoRepository.findAll().size();

        // Create the ItemPedido
        restItemPedidoMockMvc.perform(post("/api/item-pedidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(itemPedido)))
            .andExpect(status().isCreated());

        // Validate the ItemPedido in the database
        List<ItemPedido> itemPedidoList = itemPedidoRepository.findAll();
        assertThat(itemPedidoList).hasSize(databaseSizeBeforeCreate + 1);
        ItemPedido testItemPedido = itemPedidoList.get(itemPedidoList.size() - 1);
        assertThat(testItemPedido.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testItemPedido.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testItemPedido.getPrecio()).isEqualTo(DEFAULT_PRECIO);
        assertThat(testItemPedido.getTiempoPreparacion()).isEqualTo(DEFAULT_TIEMPO_PREPARACION);
    }

    @Test
    @Transactional
    public void createItemPedidoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = itemPedidoRepository.findAll().size();

        // Create the ItemPedido with an existing ID
        itemPedido.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restItemPedidoMockMvc.perform(post("/api/item-pedidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(itemPedido)))
            .andExpect(status().isBadRequest());

        // Validate the ItemPedido in the database
        List<ItemPedido> itemPedidoList = itemPedidoRepository.findAll();
        assertThat(itemPedidoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllItemPedidos() throws Exception {
        // Initialize the database
        itemPedidoRepository.saveAndFlush(itemPedido);

        // Get all the itemPedidoList
        restItemPedidoMockMvc.perform(get("/api/item-pedidos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(itemPedido.getId().intValue())))
            .andExpect(jsonPath("$.[*].nombre").value(hasItem(DEFAULT_NOMBRE)))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION)))
            .andExpect(jsonPath("$.[*].precio").value(hasItem(DEFAULT_PRECIO.intValue())))
            .andExpect(jsonPath("$.[*].tiempoPreparacion").value(hasItem(DEFAULT_TIEMPO_PREPARACION)));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllItemPedidosWithEagerRelationshipsIsEnabled() throws Exception {
        ItemPedidoResource itemPedidoResource = new ItemPedidoResource(itemPedidoRepositoryMock);
        when(itemPedidoRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restItemPedidoMockMvc = MockMvcBuilders.standaloneSetup(itemPedidoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restItemPedidoMockMvc.perform(get("/api/item-pedidos?eagerload=true"))
        .andExpect(status().isOk());

        verify(itemPedidoRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllItemPedidosWithEagerRelationshipsIsNotEnabled() throws Exception {
        ItemPedidoResource itemPedidoResource = new ItemPedidoResource(itemPedidoRepositoryMock);
            when(itemPedidoRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restItemPedidoMockMvc = MockMvcBuilders.standaloneSetup(itemPedidoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restItemPedidoMockMvc.perform(get("/api/item-pedidos?eagerload=true"))
        .andExpect(status().isOk());

            verify(itemPedidoRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getItemPedido() throws Exception {
        // Initialize the database
        itemPedidoRepository.saveAndFlush(itemPedido);

        // Get the itemPedido
        restItemPedidoMockMvc.perform(get("/api/item-pedidos/{id}", itemPedido.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(itemPedido.getId().intValue()))
            .andExpect(jsonPath("$.nombre").value(DEFAULT_NOMBRE))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION))
            .andExpect(jsonPath("$.precio").value(DEFAULT_PRECIO.intValue()))
            .andExpect(jsonPath("$.tiempoPreparacion").value(DEFAULT_TIEMPO_PREPARACION));
    }

    @Test
    @Transactional
    public void getNonExistingItemPedido() throws Exception {
        // Get the itemPedido
        restItemPedidoMockMvc.perform(get("/api/item-pedidos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateItemPedido() throws Exception {
        // Initialize the database
        itemPedidoRepository.saveAndFlush(itemPedido);

        int databaseSizeBeforeUpdate = itemPedidoRepository.findAll().size();

        // Update the itemPedido
        ItemPedido updatedItemPedido = itemPedidoRepository.findById(itemPedido.getId()).get();
        // Disconnect from session so that the updates on updatedItemPedido are not directly saved in db
        em.detach(updatedItemPedido);
        updatedItemPedido
            .nombre(UPDATED_NOMBRE)
            .descripcion(UPDATED_DESCRIPCION)
            .precio(UPDATED_PRECIO)
            .tiempoPreparacion(UPDATED_TIEMPO_PREPARACION);

        restItemPedidoMockMvc.perform(put("/api/item-pedidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedItemPedido)))
            .andExpect(status().isOk());

        // Validate the ItemPedido in the database
        List<ItemPedido> itemPedidoList = itemPedidoRepository.findAll();
        assertThat(itemPedidoList).hasSize(databaseSizeBeforeUpdate);
        ItemPedido testItemPedido = itemPedidoList.get(itemPedidoList.size() - 1);
        assertThat(testItemPedido.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testItemPedido.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testItemPedido.getPrecio()).isEqualTo(UPDATED_PRECIO);
        assertThat(testItemPedido.getTiempoPreparacion()).isEqualTo(UPDATED_TIEMPO_PREPARACION);
    }

    @Test
    @Transactional
    public void updateNonExistingItemPedido() throws Exception {
        int databaseSizeBeforeUpdate = itemPedidoRepository.findAll().size();

        // Create the ItemPedido

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restItemPedidoMockMvc.perform(put("/api/item-pedidos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(itemPedido)))
            .andExpect(status().isBadRequest());

        // Validate the ItemPedido in the database
        List<ItemPedido> itemPedidoList = itemPedidoRepository.findAll();
        assertThat(itemPedidoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteItemPedido() throws Exception {
        // Initialize the database
        itemPedidoRepository.saveAndFlush(itemPedido);

        int databaseSizeBeforeDelete = itemPedidoRepository.findAll().size();

        // Delete the itemPedido
        restItemPedidoMockMvc.perform(delete("/api/item-pedidos/{id}", itemPedido.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ItemPedido> itemPedidoList = itemPedidoRepository.findAll();
        assertThat(itemPedidoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ItemPedido.class);
        ItemPedido itemPedido1 = new ItemPedido();
        itemPedido1.setId(1L);
        ItemPedido itemPedido2 = new ItemPedido();
        itemPedido2.setId(itemPedido1.getId());
        assertThat(itemPedido1).isEqualTo(itemPedido2);
        itemPedido2.setId(2L);
        assertThat(itemPedido1).isNotEqualTo(itemPedido2);
        itemPedido1.setId(null);
        assertThat(itemPedido1).isNotEqualTo(itemPedido2);
    }
}
