package com.mycompany.myapp.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Ingrediente.
 */
@Entity
@Table(name = "ingrediente")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Ingrediente implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "vegetariano")
    private Boolean vegetariano;

    @Column(name = "vegano")
    private Boolean vegano;

    @Column(name = "kcal")
    private Integer kcal;

    @ManyToMany(mappedBy = "ingredientes")
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

    public Ingrediente nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Boolean isVegetariano() {
        return vegetariano;
    }

    public Ingrediente vegetariano(Boolean vegetariano) {
        this.vegetariano = vegetariano;
        return this;
    }

    public void setVegetariano(Boolean vegetariano) {
        this.vegetariano = vegetariano;
    }

    public Boolean isVegano() {
        return vegano;
    }

    public Ingrediente vegano(Boolean vegano) {
        this.vegano = vegano;
        return this;
    }

    public void setVegano(Boolean vegano) {
        this.vegano = vegano;
    }

    public Integer getKcal() {
        return kcal;
    }

    public Ingrediente kcal(Integer kcal) {
        this.kcal = kcal;
        return this;
    }

    public void setKcal(Integer kcal) {
        this.kcal = kcal;
    }

    public Set<ItemPedido> getItems() {
        return items;
    }

    public Ingrediente items(Set<ItemPedido> itemPedidos) {
        this.items = itemPedidos;
        return this;
    }

    public Ingrediente addItem(ItemPedido itemPedido) {
        this.items.add(itemPedido);
        itemPedido.getIngredientes().add(this);
        return this;
    }

    public Ingrediente removeItem(ItemPedido itemPedido) {
        this.items.remove(itemPedido);
        itemPedido.getIngredientes().remove(this);
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
        if (!(o instanceof Ingrediente)) {
            return false;
        }
        return id != null && id.equals(((Ingrediente) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Ingrediente{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", vegetariano='" + isVegetariano() + "'" +
            ", vegano='" + isVegano() + "'" +
            ", kcal=" + getKcal() +
            "}";
    }
}
