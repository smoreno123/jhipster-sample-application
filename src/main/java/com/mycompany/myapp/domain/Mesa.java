package com.mycompany.myapp.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Mesa.
 */
@Entity
@Table(name = "mesa")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Mesa implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "num_mesa")
    private Integer numMesa;

    @Column(name = "capacidad")
    private Integer capacidad;

    @OneToMany(mappedBy = "mesa")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Pedido> pedidos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNumMesa() {
        return numMesa;
    }

    public Mesa numMesa(Integer numMesa) {
        this.numMesa = numMesa;
        return this;
    }

    public void setNumMesa(Integer numMesa) {
        this.numMesa = numMesa;
    }

    public Integer getCapacidad() {
        return capacidad;
    }

    public Mesa capacidad(Integer capacidad) {
        this.capacidad = capacidad;
        return this;
    }

    public void setCapacidad(Integer capacidad) {
        this.capacidad = capacidad;
    }

    public Set<Pedido> getPedidos() {
        return pedidos;
    }

    public Mesa pedidos(Set<Pedido> pedidos) {
        this.pedidos = pedidos;
        return this;
    }

    public Mesa addPedido(Pedido pedido) {
        this.pedidos.add(pedido);
        pedido.setMesa(this);
        return this;
    }

    public Mesa removePedido(Pedido pedido) {
        this.pedidos.remove(pedido);
        pedido.setMesa(null);
        return this;
    }

    public void setPedidos(Set<Pedido> pedidos) {
        this.pedidos = pedidos;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Mesa)) {
            return false;
        }
        return id != null && id.equals(((Mesa) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Mesa{" +
            "id=" + getId() +
            ", numMesa=" + getNumMesa() +
            ", capacidad=" + getCapacidad() +
            "}";
    }
}
