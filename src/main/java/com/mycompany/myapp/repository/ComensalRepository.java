package com.mycompany.myapp.repository;
import com.mycompany.myapp.domain.Comensal;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Comensal entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ComensalRepository extends JpaRepository<Comensal, Long> {

}
