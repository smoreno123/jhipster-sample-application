package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Comensal;
import com.mycompany.myapp.repository.ComensalRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Comensal}.
 */
@RestController
@RequestMapping("/api")
public class ComensalResource {

    private final Logger log = LoggerFactory.getLogger(ComensalResource.class);

    private static final String ENTITY_NAME = "comensal";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ComensalRepository comensalRepository;

    public ComensalResource(ComensalRepository comensalRepository) {
        this.comensalRepository = comensalRepository;
    }

    /**
     * {@code POST  /comensals} : Create a new comensal.
     *
     * @param comensal the comensal to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new comensal, or with status {@code 400 (Bad Request)} if the comensal has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/comensals")
    public ResponseEntity<Comensal> createComensal(@RequestBody Comensal comensal) throws URISyntaxException {
        log.debug("REST request to save Comensal : {}", comensal);
        if (comensal.getId() != null) {
            throw new BadRequestAlertException("A new comensal cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Comensal result = comensalRepository.save(comensal);
        return ResponseEntity.created(new URI("/api/comensals/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /comensals} : Updates an existing comensal.
     *
     * @param comensal the comensal to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated comensal,
     * or with status {@code 400 (Bad Request)} if the comensal is not valid,
     * or with status {@code 500 (Internal Server Error)} if the comensal couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/comensals")
    public ResponseEntity<Comensal> updateComensal(@RequestBody Comensal comensal) throws URISyntaxException {
        log.debug("REST request to update Comensal : {}", comensal);
        if (comensal.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Comensal result = comensalRepository.save(comensal);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, comensal.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /comensals} : get all the comensals.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of comensals in body.
     */
    @GetMapping("/comensals")
    public List<Comensal> getAllComensals() {
        log.debug("REST request to get all Comensals");
        return comensalRepository.findAll();
    }

    /**
     * {@code GET  /comensals/:id} : get the "id" comensal.
     *
     * @param id the id of the comensal to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the comensal, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/comensals/{id}")
    public ResponseEntity<Comensal> getComensal(@PathVariable Long id) {
        log.debug("REST request to get Comensal : {}", id);
        Optional<Comensal> comensal = comensalRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(comensal);
    }

    /**
     * {@code DELETE  /comensals/:id} : delete the "id" comensal.
     *
     * @param id the id of the comensal to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/comensals/{id}")
    public ResponseEntity<Void> deleteComensal(@PathVariable Long id) {
        log.debug("REST request to delete Comensal : {}", id);
        comensalRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
