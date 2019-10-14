package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.TipoCocina;
import com.mycompany.myapp.repository.TipoCocinaRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.TipoCocina}.
 */
@RestController
@RequestMapping("/api")
public class TipoCocinaResource {

    private final Logger log = LoggerFactory.getLogger(TipoCocinaResource.class);

    private static final String ENTITY_NAME = "tipoCocina";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TipoCocinaRepository tipoCocinaRepository;

    public TipoCocinaResource(TipoCocinaRepository tipoCocinaRepository) {
        this.tipoCocinaRepository = tipoCocinaRepository;
    }

    /**
     * {@code POST  /tipo-cocinas} : Create a new tipoCocina.
     *
     * @param tipoCocina the tipoCocina to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tipoCocina, or with status {@code 400 (Bad Request)} if the tipoCocina has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tipo-cocinas")
    public ResponseEntity<TipoCocina> createTipoCocina(@RequestBody TipoCocina tipoCocina) throws URISyntaxException {
        log.debug("REST request to save TipoCocina : {}", tipoCocina);
        if (tipoCocina.getId() != null) {
            throw new BadRequestAlertException("A new tipoCocina cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipoCocina result = tipoCocinaRepository.save(tipoCocina);
        return ResponseEntity.created(new URI("/api/tipo-cocinas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tipo-cocinas} : Updates an existing tipoCocina.
     *
     * @param tipoCocina the tipoCocina to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoCocina,
     * or with status {@code 400 (Bad Request)} if the tipoCocina is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tipoCocina couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tipo-cocinas")
    public ResponseEntity<TipoCocina> updateTipoCocina(@RequestBody TipoCocina tipoCocina) throws URISyntaxException {
        log.debug("REST request to update TipoCocina : {}", tipoCocina);
        if (tipoCocina.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TipoCocina result = tipoCocinaRepository.save(tipoCocina);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tipoCocina.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tipo-cocinas} : get all the tipoCocinas.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tipoCocinas in body.
     */
    @GetMapping("/tipo-cocinas")
    public List<TipoCocina> getAllTipoCocinas() {
        log.debug("REST request to get all TipoCocinas");
        return tipoCocinaRepository.findAll();
    }

    /**
     * {@code GET  /tipo-cocinas/:id} : get the "id" tipoCocina.
     *
     * @param id the id of the tipoCocina to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tipoCocina, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tipo-cocinas/{id}")
    public ResponseEntity<TipoCocina> getTipoCocina(@PathVariable Long id) {
        log.debug("REST request to get TipoCocina : {}", id);
        Optional<TipoCocina> tipoCocina = tipoCocinaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tipoCocina);
    }

    /**
     * {@code DELETE  /tipo-cocinas/:id} : delete the "id" tipoCocina.
     *
     * @param id the id of the tipoCocina to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tipo-cocinas/{id}")
    public ResponseEntity<Void> deleteTipoCocina(@PathVariable Long id) {
        log.debug("REST request to delete TipoCocina : {}", id);
        tipoCocinaRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
