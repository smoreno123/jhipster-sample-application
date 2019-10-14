package com.mycompany.myapp.repository;
import com.mycompany.myapp.domain.Valoracion;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Valoracion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ValoracionRepository extends JpaRepository<Valoracion, Long> {

}
