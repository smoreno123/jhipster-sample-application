package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.TipoItemPedido;
import com.mycompany.myapp.repository.TipoItemPedidoRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.TipoItemPedido}.
 */
@RestController
@RequestMapping("/api")
public class TipoItemPedidoResource {

    private final Logger log = LoggerFactory.getLogger(TipoItemPedidoResource.class);

    private static final String ENTITY_NAME = "tipoItemPedido";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final TipoItemPedidoRepository tipoItemPedidoRepository;

    public TipoItemPedidoResource(TipoItemPedidoRepository tipoItemPedidoRepository) {
        this.tipoItemPedidoRepository = tipoItemPedidoRepository;
    }

    /**
     * {@code POST  /tipo-item-pedidos} : Create a new tipoItemPedido.
     *
     * @param tipoItemPedido the tipoItemPedido to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tipoItemPedido, or with status {@code 400 (Bad Request)} if the tipoItemPedido has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/tipo-item-pedidos")
    public ResponseEntity<TipoItemPedido> createTipoItemPedido(@RequestBody TipoItemPedido tipoItemPedido) throws URISyntaxException {
        log.debug("REST request to save TipoItemPedido : {}", tipoItemPedido);
        if (tipoItemPedido.getId() != null) {
            throw new BadRequestAlertException("A new tipoItemPedido cannot already have an ID", ENTITY_NAME, "idexists");
        }
        TipoItemPedido result = tipoItemPedidoRepository.save(tipoItemPedido);
        return ResponseEntity.created(new URI("/api/tipo-item-pedidos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /tipo-item-pedidos} : Updates an existing tipoItemPedido.
     *
     * @param tipoItemPedido the tipoItemPedido to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoItemPedido,
     * or with status {@code 400 (Bad Request)} if the tipoItemPedido is not valid,
     * or with status {@code 500 (Internal Server Error)} if the tipoItemPedido couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/tipo-item-pedidos")
    public ResponseEntity<TipoItemPedido> updateTipoItemPedido(@RequestBody TipoItemPedido tipoItemPedido) throws URISyntaxException {
        log.debug("REST request to update TipoItemPedido : {}", tipoItemPedido);
        if (tipoItemPedido.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        TipoItemPedido result = tipoItemPedidoRepository.save(tipoItemPedido);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, tipoItemPedido.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /tipo-item-pedidos} : get all the tipoItemPedidos.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tipoItemPedidos in body.
     */
    @GetMapping("/tipo-item-pedidos")
    public List<TipoItemPedido> getAllTipoItemPedidos() {
        log.debug("REST request to get all TipoItemPedidos");
        return tipoItemPedidoRepository.findAll();
    }

    /**
     * {@code GET  /tipo-item-pedidos/:id} : get the "id" tipoItemPedido.
     *
     * @param id the id of the tipoItemPedido to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tipoItemPedido, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/tipo-item-pedidos/{id}")
    public ResponseEntity<TipoItemPedido> getTipoItemPedido(@PathVariable Long id) {
        log.debug("REST request to get TipoItemPedido : {}", id);
        Optional<TipoItemPedido> tipoItemPedido = tipoItemPedidoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(tipoItemPedido);
    }

    /**
     * {@code DELETE  /tipo-item-pedidos/:id} : delete the "id" tipoItemPedido.
     *
     * @param id the id of the tipoItemPedido to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/tipo-item-pedidos/{id}")
    public ResponseEntity<Void> deleteTipoItemPedido(@PathVariable Long id) {
        log.debug("REST request to delete TipoItemPedido : {}", id);
        tipoItemPedidoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
