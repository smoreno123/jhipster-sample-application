package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.StatusItemPedido;
import com.mycompany.myapp.repository.StatusItemPedidoRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.StatusItemPedido}.
 */
@RestController
@RequestMapping("/api")
public class StatusItemPedidoResource {

    private final Logger log = LoggerFactory.getLogger(StatusItemPedidoResource.class);

    private static final String ENTITY_NAME = "statusItemPedido";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final StatusItemPedidoRepository statusItemPedidoRepository;

    public StatusItemPedidoResource(StatusItemPedidoRepository statusItemPedidoRepository) {
        this.statusItemPedidoRepository = statusItemPedidoRepository;
    }

    /**
     * {@code POST  /status-item-pedidos} : Create a new statusItemPedido.
     *
     * @param statusItemPedido the statusItemPedido to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new statusItemPedido, or with status {@code 400 (Bad Request)} if the statusItemPedido has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/status-item-pedidos")
    public ResponseEntity<StatusItemPedido> createStatusItemPedido(@RequestBody StatusItemPedido statusItemPedido) throws URISyntaxException {
        log.debug("REST request to save StatusItemPedido : {}", statusItemPedido);
        if (statusItemPedido.getId() != null) {
            throw new BadRequestAlertException("A new statusItemPedido cannot already have an ID", ENTITY_NAME, "idexists");
        }
        StatusItemPedido result = statusItemPedidoRepository.save(statusItemPedido);
        return ResponseEntity.created(new URI("/api/status-item-pedidos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /status-item-pedidos} : Updates an existing statusItemPedido.
     *
     * @param statusItemPedido the statusItemPedido to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated statusItemPedido,
     * or with status {@code 400 (Bad Request)} if the statusItemPedido is not valid,
     * or with status {@code 500 (Internal Server Error)} if the statusItemPedido couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/status-item-pedidos")
    public ResponseEntity<StatusItemPedido> updateStatusItemPedido(@RequestBody StatusItemPedido statusItemPedido) throws URISyntaxException {
        log.debug("REST request to update StatusItemPedido : {}", statusItemPedido);
        if (statusItemPedido.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        StatusItemPedido result = statusItemPedidoRepository.save(statusItemPedido);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, statusItemPedido.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /status-item-pedidos} : get all the statusItemPedidos.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of statusItemPedidos in body.
     */
    @GetMapping("/status-item-pedidos")
    public List<StatusItemPedido> getAllStatusItemPedidos() {
        log.debug("REST request to get all StatusItemPedidos");
        return statusItemPedidoRepository.findAll();
    }

    /**
     * {@code GET  /status-item-pedidos/:id} : get the "id" statusItemPedido.
     *
     * @param id the id of the statusItemPedido to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the statusItemPedido, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/status-item-pedidos/{id}")
    public ResponseEntity<StatusItemPedido> getStatusItemPedido(@PathVariable Long id) {
        log.debug("REST request to get StatusItemPedido : {}", id);
        Optional<StatusItemPedido> statusItemPedido = statusItemPedidoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(statusItemPedido);
    }

    /**
     * {@code DELETE  /status-item-pedidos/:id} : delete the "id" statusItemPedido.
     *
     * @param id the id of the statusItemPedido to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/status-item-pedidos/{id}")
    public ResponseEntity<Void> deleteStatusItemPedido(@PathVariable Long id) {
        log.debug("REST request to delete StatusItemPedido : {}", id);
        statusItemPedidoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
