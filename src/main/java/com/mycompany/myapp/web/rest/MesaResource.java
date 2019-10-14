package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.Mesa;
import com.mycompany.myapp.repository.MesaRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.Mesa}.
 */
@RestController
@RequestMapping("/api")
public class MesaResource {

    private final Logger log = LoggerFactory.getLogger(MesaResource.class);

    private static final String ENTITY_NAME = "mesa";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MesaRepository mesaRepository;

    public MesaResource(MesaRepository mesaRepository) {
        this.mesaRepository = mesaRepository;
    }

    /**
     * {@code POST  /mesas} : Create a new mesa.
     *
     * @param mesa the mesa to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new mesa, or with status {@code 400 (Bad Request)} if the mesa has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/mesas")
    public ResponseEntity<Mesa> createMesa(@RequestBody Mesa mesa) throws URISyntaxException {
        log.debug("REST request to save Mesa : {}", mesa);
        if (mesa.getId() != null) {
            throw new BadRequestAlertException("A new mesa cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Mesa result = mesaRepository.save(mesa);
        return ResponseEntity.created(new URI("/api/mesas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /mesas} : Updates an existing mesa.
     *
     * @param mesa the mesa to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated mesa,
     * or with status {@code 400 (Bad Request)} if the mesa is not valid,
     * or with status {@code 500 (Internal Server Error)} if the mesa couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/mesas")
    public ResponseEntity<Mesa> updateMesa(@RequestBody Mesa mesa) throws URISyntaxException {
        log.debug("REST request to update Mesa : {}", mesa);
        if (mesa.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Mesa result = mesaRepository.save(mesa);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, mesa.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /mesas} : get all the mesas.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of mesas in body.
     */
    @GetMapping("/mesas")
    public List<Mesa> getAllMesas() {
        log.debug("REST request to get all Mesas");
        return mesaRepository.findAll();
    }

    /**
     * {@code GET  /mesas/:id} : get the "id" mesa.
     *
     * @param id the id of the mesa to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the mesa, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/mesas/{id}")
    public ResponseEntity<Mesa> getMesa(@PathVariable Long id) {
        log.debug("REST request to get Mesa : {}", id);
        Optional<Mesa> mesa = mesaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(mesa);
    }

    /**
     * {@code DELETE  /mesas/:id} : delete the "id" mesa.
     *
     * @param id the id of the mesa to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/mesas/{id}")
    public ResponseEntity<Void> deleteMesa(@PathVariable Long id) {
        log.debug("REST request to delete Mesa : {}", id);
        mesaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
