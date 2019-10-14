package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Valoracion;
import com.mycompany.myapp.repository.ValoracionRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Valoracion}.
 */
@RestController
@RequestMapping("/api")
public class ValoracionResource {

    private final Logger log = LoggerFactory.getLogger(ValoracionResource.class);

    private static final String ENTITY_NAME = "valoracion";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ValoracionRepository valoracionRepository;

    public ValoracionResource(ValoracionRepository valoracionRepository) {
        this.valoracionRepository = valoracionRepository;
    }

    /**
     * {@code POST  /valoracions} : Create a new valoracion.
     *
     * @param valoracion the valoracion to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new valoracion, or with status {@code 400 (Bad Request)} if the valoracion has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/valoracions")
    public ResponseEntity<Valoracion> createValoracion(@RequestBody Valoracion valoracion) throws URISyntaxException {
        log.debug("REST request to save Valoracion : {}", valoracion);
        if (valoracion.getId() != null) {
            throw new BadRequestAlertException("A new valoracion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Valoracion result = valoracionRepository.save(valoracion);
        return ResponseEntity.created(new URI("/api/valoracions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /valoracions} : Updates an existing valoracion.
     *
     * @param valoracion the valoracion to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated valoracion,
     * or with status {@code 400 (Bad Request)} if the valoracion is not valid,
     * or with status {@code 500 (Internal Server Error)} if the valoracion couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/valoracions")
    public ResponseEntity<Valoracion> updateValoracion(@RequestBody Valoracion valoracion) throws URISyntaxException {
        log.debug("REST request to update Valoracion : {}", valoracion);
        if (valoracion.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Valoracion result = valoracionRepository.save(valoracion);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, valoracion.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /valoracions} : get all the valoracions.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of valoracions in body.
     */
    @GetMapping("/valoracions")
    public List<Valoracion> getAllValoracions() {
        log.debug("REST request to get all Valoracions");
        return valoracionRepository.findAll();
    }

    /**
     * {@code GET  /valoracions/:id} : get the "id" valoracion.
     *
     * @param id the id of the valoracion to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the valoracion, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/valoracions/{id}")
    public ResponseEntity<Valoracion> getValoracion(@PathVariable Long id) {
        log.debug("REST request to get Valoracion : {}", id);
        Optional<Valoracion> valoracion = valoracionRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(valoracion);
    }

    /**
     * {@code DELETE  /valoracions/:id} : delete the "id" valoracion.
     *
     * @param id the id of the valoracion to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/valoracions/{id}")
    public ResponseEntity<Void> deleteValoracion(@PathVariable Long id) {
        log.debug("REST request to delete Valoracion : {}", id);
        valoracionRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
