package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Ingrediente;
import com.mycompany.myapp.repository.IngredienteRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Ingrediente}.
 */
@RestController
@RequestMapping("/api")
public class IngredienteResource {

    private final Logger log = LoggerFactory.getLogger(IngredienteResource.class);

    private static final String ENTITY_NAME = "ingrediente";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final IngredienteRepository ingredienteRepository;

    public IngredienteResource(IngredienteRepository ingredienteRepository) {
        this.ingredienteRepository = ingredienteRepository;
    }

    /**
     * {@code POST  /ingredientes} : Create a new ingrediente.
     *
     * @param ingrediente the ingrediente to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ingrediente, or with status {@code 400 (Bad Request)} if the ingrediente has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ingredientes")
    public ResponseEntity<Ingrediente> createIngrediente(@RequestBody Ingrediente ingrediente) throws URISyntaxException {
        log.debug("REST request to save Ingrediente : {}", ingrediente);
        if (ingrediente.getId() != null) {
            throw new BadRequestAlertException("A new ingrediente cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Ingrediente result = ingredienteRepository.save(ingrediente);
        return ResponseEntity.created(new URI("/api/ingredientes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ingredientes} : Updates an existing ingrediente.
     *
     * @param ingrediente the ingrediente to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ingrediente,
     * or with status {@code 400 (Bad Request)} if the ingrediente is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ingrediente couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ingredientes")
    public ResponseEntity<Ingrediente> updateIngrediente(@RequestBody Ingrediente ingrediente) throws URISyntaxException {
        log.debug("REST request to update Ingrediente : {}", ingrediente);
        if (ingrediente.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Ingrediente result = ingredienteRepository.save(ingrediente);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ingrediente.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /ingredientes} : get all the ingredientes.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ingredientes in body.
     */
    @GetMapping("/ingredientes")
    public List<Ingrediente> getAllIngredientes() {
        log.debug("REST request to get all Ingredientes");
        return ingredienteRepository.findAll();
    }

    /**
     * {@code GET  /ingredientes/:id} : get the "id" ingrediente.
     *
     * @param id the id of the ingrediente to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ingrediente, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ingredientes/{id}")
    public ResponseEntity<Ingrediente> getIngrediente(@PathVariable Long id) {
        log.debug("REST request to get Ingrediente : {}", id);
        Optional<Ingrediente> ingrediente = ingredienteRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ingrediente);
    }

    /**
     * {@code DELETE  /ingredientes/:id} : delete the "id" ingrediente.
     *
     * @param id the id of the ingrediente to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ingredientes/{id}")
    public ResponseEntity<Void> deleteIngrediente(@PathVariable Long id) {
        log.debug("REST request to delete Ingrediente : {}", id);
        ingredienteRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
