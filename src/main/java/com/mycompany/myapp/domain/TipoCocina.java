package com.mycompany.myapp.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A TipoCocina.
 */
@Entity
@Table(name = "tipo_cocina")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TipoCocina implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @ManyToMany(mappedBy = "tipoCocinas")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<ItemPedido> items = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public TipoCocina nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Set<ItemPedido> getItems() {
        return items;
    }

    public TipoCocina items(Set<ItemPedido> itemPedidos) {
        this.items = itemPedidos;
        return this;
    }

    public TipoCocina addItem(ItemPedido itemPedido) {
        this.items.add(itemPedido);
        itemPedido.getTipoCocinas().add(this);
        return this;
    }

    public TipoCocina removeItem(ItemPedido itemPedido) {
        this.items.remove(itemPedido);
        itemPedido.getTipoCocinas().remove(this);
        return this;
    }

    public void setItems(Set<ItemPedido> itemPedidos) {
        this.items = itemPedidos;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TipoCocina)) {
            return false;
        }
        return id != null && id.equals(((TipoCocina) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "TipoCocina{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            "}";
    }
}
