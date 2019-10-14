package com.mycompany.myapp.repository;
import com.mycompany.myapp.domain.Mesa;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Mesa entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MesaRepository extends JpaRepository<Mesa, Long> {

}
