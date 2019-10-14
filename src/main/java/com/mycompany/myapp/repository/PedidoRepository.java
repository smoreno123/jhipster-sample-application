package com.mycompany.myapp.repository;
import com.mycompany.myapp.domain.Pedido;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Pedido entity.
 */
@Repository
public interface PedidoRepository extends JpaRepository<Pedido, Long> {

    @Query(value = "select distinct pedido from Pedido pedido left join fetch pedido.menus left join fetch pedido.itemPedidos",
        countQuery = "select count(distinct pedido) from Pedido pedido")
    Page<Pedido> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct pedido from Pedido pedido left join fetch pedido.menus left join fetch pedido.itemPedidos")
    List<Pedido> findAllWithEagerRelationships();

    @Query("select pedido from Pedido pedido left join fetch pedido.menus left join fetch pedido.itemPedidos where pedido.id =:id")
    Optional<Pedido> findOneWithEagerRelationships(@Param("id") Long id);

}
