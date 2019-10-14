package com.mycompany.myapp.repository;
import com.mycompany.myapp.domain.TipoCocina;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TipoCocina entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoCocinaRepository extends JpaRepository<TipoCocina, Long> {

}
