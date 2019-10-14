package com.mycompany.myapp.repository;
import com.mycompany.myapp.domain.PagoPedido;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PagoPedido entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PagoPedidoRepository extends JpaRepository<PagoPedido, Long> {

}
