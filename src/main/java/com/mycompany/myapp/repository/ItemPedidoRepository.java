package com.mycompany.myapp.repository;
import com.mycompany.myapp.domain.ItemPedido;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the ItemPedido entity.
 */
@Repository
public interface ItemPedidoRepository extends JpaRepository<ItemPedido, Long> {

    @Query(value = "select distinct itemPedido from ItemPedido itemPedido left join fetch itemPedido.tipoItemPedidos left join fetch itemPedido.tipoCocinas left join fetch itemPedido.ingredientes left join fetch itemPedido.menus",
        countQuery = "select count(distinct itemPedido) from ItemPedido itemPedido")
    Page<ItemPedido> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct itemPedido from ItemPedido itemPedido left join fetch itemPedido.tipoItemPedidos left join fetch itemPedido.tipoCocinas left join fetch itemPedido.ingredientes left join fetch itemPedido.menus")
    List<ItemPedido> findAllWithEagerRelationships();

    @Query("select itemPedido from ItemPedido itemPedido left join fetch itemPedido.tipoItemPedidos left join fetch itemPedido.tipoCocinas left join fetch itemPedido.ingredientes left join fetch itemPedido.menus where itemPedido.id =:id")
    Optional<ItemPedido> findOneWithEagerRelationships(@Param("id") Long id);

}
