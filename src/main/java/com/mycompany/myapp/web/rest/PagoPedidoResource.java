package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.PagoPedido;
import com.mycompany.myapp.repository.PagoPedidoRepository;
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
 * REST controller for managing {@link com.mycompany.myapp.domain.PagoPedido}.
 */
@RestController
@RequestMapping("/api")
public class PagoPedidoResource {

    private final Logger log = LoggerFactory.getLogger(PagoPedidoResource.class);

    private static final String ENTITY_NAME = "pagoPedido";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PagoPedidoRepository pagoPedidoRepository;

    public PagoPedidoResource(PagoPedidoRepository pagoPedidoRepository) {
        this.pagoPedidoRepository = pagoPedidoRepository;
    }

    /**
     * {@code POST  /pago-pedidos} : Create a new pagoPedido.
     *
     * @param pagoPedido the pagoPedido to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new pagoPedido, or with status {@code 400 (Bad Request)} if the pagoPedido has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/pago-pedidos")
    public ResponseEntity<PagoPedido> createPagoPedido(@RequestBody PagoPedido pagoPedido) throws URISyntaxException {
        log.debug("REST request to save PagoPedido : {}", pagoPedido);
        if (pagoPedido.getId() != null) {
            throw new BadRequestAlertException("A new pagoPedido cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PagoPedido result = pagoPedidoRepository.save(pagoPedido);
        return ResponseEntity.created(new URI("/api/pago-pedidos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /pago-pedidos} : Updates an existing pagoPedido.
     *
     * @param pagoPedido the pagoPedido to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated pagoPedido,
     * or with status {@code 400 (Bad Request)} if the pagoPedido is not valid,
     * or with status {@code 500 (Internal Server Error)} if the pagoPedido couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/pago-pedidos")
    public ResponseEntity<PagoPedido> updatePagoPedido(@RequestBody PagoPedido pagoPedido) throws URISyntaxException {
        log.debug("REST request to update PagoPedido : {}", pagoPedido);
        if (pagoPedido.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PagoPedido result = pagoPedidoRepository.save(pagoPedido);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, pagoPedido.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /pago-pedidos} : get all the pagoPedidos.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of pagoPedidos in body.
     */
    @GetMapping("/pago-pedidos")
    public List<PagoPedido> getAllPagoPedidos() {
        log.debug("REST request to get all PagoPedidos");
        return pagoPedidoRepository.findAll();
    }

    /**
     * {@code GET  /pago-pedidos/:id} : get the "id" pagoPedido.
     *
     * @param id the id of the pagoPedido to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the pagoPedido, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/pago-pedidos/{id}")
    public ResponseEntity<PagoPedido> getPagoPedido(@PathVariable Long id) {
        log.debug("REST request to get PagoPedido : {}", id);
        Optional<PagoPedido> pagoPedido = pagoPedidoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(pagoPedido);
    }

    /**
     * {@code DELETE  /pago-pedidos/:id} : delete the "id" pagoPedido.
     *
     * @param id the id of the pagoPedido to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/pago-pedidos/{id}")
    public ResponseEntity<Void> deletePagoPedido(@PathVariable Long id) {
        log.debug("REST request to delete PagoPedido : {}", id);
        pagoPedidoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
