package com.mycompany.myapp.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;

/**
 * A Menu.
 */
@Entity
@Table(name = "menu")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Menu implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "fecha_inicio")
    private ZonedDateTime fechaInicio;

    @Column(name = "fecha_final")
    private ZonedDateTime fechaFinal;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "precio")
    private Float precio;

    @ManyToMany(mappedBy = "menus")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<ItemPedido> items = new HashSet<>();

    @ManyToMany(mappedBy = "menus")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Pedido> pedidos = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getFechaInicio() {
        return fechaInicio;
    }

    public Menu fechaInicio(ZonedDateTime fechaInicio) {
        this.fechaInicio = fechaInicio;
        return this;
    }

    public void setFechaInicio(ZonedDateTime fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public ZonedDateTime getFechaFinal() {
        return fechaFinal;
    }

    public Menu fechaFinal(ZonedDateTime fechaFinal) {
        this.fechaFinal = fechaFinal;
        return this;
    }

    public void setFechaFinal(ZonedDateTime fechaFinal) {
        this.fechaFinal = fechaFinal;
    }

    public String getNombre() {
        return nombre;
    }

    public Menu nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Float getPrecio() {
        return precio;
    }

    public Menu precio(Float precio) {
        this.precio = precio;
        return this;
    }

    public void setPrecio(Float precio) {
        this.precio = precio;
    }

    public Set<ItemPedido> getItems() {
        return items;
    }

    public Menu items(Set<ItemPedido> itemPedidos) {
        this.items = itemPedidos;
        return this;
    }

    public Menu addItem(ItemPedido itemPedido) {
        this.items.add(itemPedido);
        itemPedido.getMenus().add(this);
        return this;
    }

    public Menu removeItem(ItemPedido itemPedido) {
        this.items.remove(itemPedido);
        itemPedido.getMenus().remove(this);
        return this;
    }

    public void setItems(Set<ItemPedido> itemPedidos) {
        this.items = itemPedidos;
    }

    public Set<Pedido> getPedidos() {
        return pedidos;
    }

    public Menu pedidos(Set<Pedido> pedidos) {
        this.pedidos = pedidos;
        return this;
    }

    public Menu addPedido(Pedido pedido) {
        this.pedidos.add(pedido);
        pedido.getMenus().add(this);
        return this;
    }

    public Menu removePedido(Pedido pedido) {
        this.pedidos.remove(pedido);
        pedido.getMenus().remove(this);
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
        if (!(o instanceof Menu)) {
            return false;
        }
        return id != null && id.equals(((Menu) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Menu{" +
            "id=" + getId() +
            ", fechaInicio='" + getFechaInicio() + "'" +
            ", fechaFinal='" + getFechaFinal() + "'" +
            ", nombre='" + getNombre() + "'" +
            ", precio=" + getPrecio() +
            "}";
    }
}
