package com.mycompany.myapp.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A TipoItemPedido.
 */
@Entity
@Table(name = "tipo_item_pedido")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class TipoItemPedido implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre_tipo")
    private String nombreTipo;

    @ManyToMany(mappedBy = "tipoItemPedidos")
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

    public String getNombreTipo() {
        return nombreTipo;
    }

    public TipoItemPedido nombreTipo(String nombreTipo) {
        this.nombreTipo = nombreTipo;
        return this;
    }

    public void setNombreTipo(String nombreTipo) {
        this.nombreTipo = nombreTipo;
    }

    public Set<ItemPedido> getItems() {
        return items;
    }

    public TipoItemPedido items(Set<ItemPedido> itemPedidos) {
        this.items = itemPedidos;
        return this;
    }

    public TipoItemPedido addItem(ItemPedido itemPedido) {
        this.items.add(itemPedido);
        itemPedido.getTipoItemPedidos().add(this);
        return this;
    }

    public TipoItemPedido removeItem(ItemPedido itemPedido) {
        this.items.remove(itemPedido);
        itemPedido.getTipoItemPedidos().remove(this);
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
        if (!(o instanceof TipoItemPedido)) {
            return false;
        }
        return id != null && id.equals(((TipoItemPedido) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "TipoItemPedido{" +
            "id=" + getId() +
            ", nombreTipo='" + getNombreTipo() + "'" +
            "}";
    }
}
