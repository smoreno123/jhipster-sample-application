package com.mycompany.myapp.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Comensal.
 */
@Entity
@Table(name = "comensal")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Comensal implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "dni")
    private String dni;

    @Column(name = "nombre")
    private String nombre;

    @OneToOne
    @JoinColumn(unique = true)
    private User usuario;

    @OneToMany(mappedBy = "comensal")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Valoracion> valoracions = new HashSet<>();

    @OneToMany(mappedBy = "comensal")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<PagoPedido> pagos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDni() {
        return dni;
    }

    public Comensal dni(String dni) {
        this.dni = dni;
        return this;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public String getNombre() {
        return nombre;
    }

    public Comensal nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public User getUsuario() {
        return usuario;
    }

    public Comensal usuario(User user) {
        this.usuario = user;
        return this;
    }

    public void setUsuario(User user) {
        this.usuario = user;
    }

    public Set<Valoracion> getValoracions() {
        return valoracions;
    }

    public Comensal valoracions(Set<Valoracion> valoracions) {
        this.valoracions = valoracions;
        return this;
    }

    public Comensal addValoracion(Valoracion valoracion) {
        this.valoracions.add(valoracion);
        valoracion.setComensal(this);
        return this;
    }

    public Comensal removeValoracion(Valoracion valoracion) {
        this.valoracions.remove(valoracion);
        valoracion.setComensal(null);
        return this;
    }

    public void setValoracions(Set<Valoracion> valoracions) {
        this.valoracions = valoracions;
    }

    public Set<PagoPedido> getPagos() {
        return pagos;
    }

    public Comensal pagos(Set<PagoPedido> pagoPedidos) {
        this.pagos = pagoPedidos;
        return this;
    }

    public Comensal addPago(PagoPedido pagoPedido) {
        this.pagos.add(pagoPedido);
        pagoPedido.setComensal(this);
        return this;
    }

    public Comensal removePago(PagoPedido pagoPedido) {
        this.pagos.remove(pagoPedido);
        pagoPedido.setComensal(null);
        return this;
    }

    public void setPagos(Set<PagoPedido> pagoPedidos) {
        this.pagos = pagoPedidos;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Comensal)) {
            return false;
        }
        return id != null && id.equals(((Comensal) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Comensal{" +
            "id=" + getId() +
            ", dni='" + getDni() + "'" +
            ", nombre='" + getNombre() + "'" +
            "}";
    }
}
