package com.mycompany.myapp.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

/**
 * A ItemPedido.
 */
@Entity
@Table(name = "item_pedido")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ItemPedido implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nombre")
    private String nombre;

    @Column(name = "descripcion")
    private String descripcion;

    @Column(name = "precio", precision = 21, scale = 2)
    private BigDecimal precio;

    @Column(name = "tiempo_preparacion")
    private Integer tiempoPreparacion;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "item_pedido_tipo_item_pedido",
               joinColumns = @JoinColumn(name = "item_pedido_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "tipo_item_pedido_id", referencedColumnName = "id"))
    private Set<TipoItemPedido> tipoItemPedidos = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "item_pedido_tipo_cocina",
               joinColumns = @JoinColumn(name = "item_pedido_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "tipo_cocina_id", referencedColumnName = "id"))
    private Set<TipoCocina> tipoCocinas = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "item_pedido_ingrediente",
               joinColumns = @JoinColumn(name = "item_pedido_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "ingrediente_id", referencedColumnName = "id"))
    private Set<Ingrediente> ingredientes = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "item_pedido_menu",
               joinColumns = @JoinColumn(name = "item_pedido_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "menu_id", referencedColumnName = "id"))
    private Set<Menu> menus = new HashSet<>();

    @OneToMany(mappedBy = "itemPedido")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Valoracion> valoracions = new HashSet<>();

    @OneToMany(mappedBy = "itemPedido")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<StatusItemPedido> statuses = new HashSet<>();

    @ManyToMany(mappedBy = "itemPedidos")
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

    public String getNombre() {
        return nombre;
    }

    public ItemPedido nombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public ItemPedido descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public BigDecimal getPrecio() {
        return precio;
    }

    public ItemPedido precio(BigDecimal precio) {
        this.precio = precio;
        return this;
    }

    public void setPrecio(BigDecimal precio) {
        this.precio = precio;
    }

    public Integer getTiempoPreparacion() {
        return tiempoPreparacion;
    }

    public ItemPedido tiempoPreparacion(Integer tiempoPreparacion) {
        this.tiempoPreparacion = tiempoPreparacion;
        return this;
    }

    public void setTiempoPreparacion(Integer tiempoPreparacion) {
        this.tiempoPreparacion = tiempoPreparacion;
    }

    public Set<TipoItemPedido> getTipoItemPedidos() {
        return tipoItemPedidos;
    }

    public ItemPedido tipoItemPedidos(Set<TipoItemPedido> tipoItemPedidos) {
        this.tipoItemPedidos = tipoItemPedidos;
        return this;
    }

    public ItemPedido addTipoItemPedido(TipoItemPedido tipoItemPedido) {
        this.tipoItemPedidos.add(tipoItemPedido);
        tipoItemPedido.getItems().add(this);
        return this;
    }

    public ItemPedido removeTipoItemPedido(TipoItemPedido tipoItemPedido) {
        this.tipoItemPedidos.remove(tipoItemPedido);
        tipoItemPedido.getItems().remove(this);
        return this;
    }

    public void setTipoItemPedidos(Set<TipoItemPedido> tipoItemPedidos) {
        this.tipoItemPedidos = tipoItemPedidos;
    }

    public Set<TipoCocina> getTipoCocinas() {
        return tipoCocinas;
    }

    public ItemPedido tipoCocinas(Set<TipoCocina> tipoCocinas) {
        this.tipoCocinas = tipoCocinas;
        return this;
    }

    public ItemPedido addTipoCocina(TipoCocina tipoCocina) {
        this.tipoCocinas.add(tipoCocina);
        tipoCocina.getItems().add(this);
        return this;
    }

    public ItemPedido removeTipoCocina(TipoCocina tipoCocina) {
        this.tipoCocinas.remove(tipoCocina);
        tipoCocina.getItems().remove(this);
        return this;
    }

    public void setTipoCocinas(Set<TipoCocina> tipoCocinas) {
        this.tipoCocinas = tipoCocinas;
    }

    public Set<Ingrediente> getIngredientes() {
        return ingredientes;
    }

    public ItemPedido ingredientes(Set<Ingrediente> ingredientes) {
        this.ingredientes = ingredientes;
        return this;
    }

    public ItemPedido addIngrediente(Ingrediente ingrediente) {
        this.ingredientes.add(ingrediente);
        ingrediente.getItems().add(this);
        return this;
    }

    public ItemPedido removeIngrediente(Ingrediente ingrediente) {
        this.ingredientes.remove(ingrediente);
        ingrediente.getItems().remove(this);
        return this;
    }

    public void setIngredientes(Set<Ingrediente> ingredientes) {
        this.ingredientes = ingredientes;
    }

    public Set<Menu> getMenus() {
        return menus;
    }

    public ItemPedido menus(Set<Menu> menus) {
        this.menus = menus;
        return this;
    }

    public ItemPedido addMenu(Menu menu) {
        this.menus.add(menu);
        menu.getItems().add(this);
        return this;
    }

    public ItemPedido removeMenu(Menu menu) {
        this.menus.remove(menu);
        menu.getItems().remove(this);
        return this;
    }

    public void setMenus(Set<Menu> menus) {
        this.menus = menus;
    }

    public Set<Valoracion> getValoracions() {
        return valoracions;
    }

    public ItemPedido valoracions(Set<Valoracion> valoracions) {
        this.valoracions = valoracions;
        return this;
    }

    public ItemPedido addValoracion(Valoracion valoracion) {
        this.valoracions.add(valoracion);
        valoracion.setItemPedido(this);
        return this;
    }

    public ItemPedido removeValoracion(Valoracion valoracion) {
        this.valoracions.remove(valoracion);
        valoracion.setItemPedido(null);
        return this;
    }

    public void setValoracions(Set<Valoracion> valoracions) {
        this.valoracions = valoracions;
    }

    public Set<StatusItemPedido> getStatuses() {
        return statuses;
    }

    public ItemPedido statuses(Set<StatusItemPedido> statusItemPedidos) {
        this.statuses = statusItemPedidos;
        return this;
    }

    public ItemPedido addStatus(StatusItemPedido statusItemPedido) {
        this.statuses.add(statusItemPedido);
        statusItemPedido.setItemPedido(this);
        return this;
    }

    public ItemPedido removeStatus(StatusItemPedido statusItemPedido) {
        this.statuses.remove(statusItemPedido);
        statusItemPedido.setItemPedido(null);
        return this;
    }

    public void setStatuses(Set<StatusItemPedido> statusItemPedidos) {
        this.statuses = statusItemPedidos;
    }

    public Set<Pedido> getPedidos() {
        return pedidos;
    }

    public ItemPedido pedidos(Set<Pedido> pedidos) {
        this.pedidos = pedidos;
        return this;
    }

    public ItemPedido addPedido(Pedido pedido) {
        this.pedidos.add(pedido);
        pedido.getItemPedidos().add(this);
        return this;
    }

    public ItemPedido removePedido(Pedido pedido) {
        this.pedidos.remove(pedido);
        pedido.getItemPedidos().remove(this);
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
        if (!(o instanceof ItemPedido)) {
            return false;
        }
        return id != null && id.equals(((ItemPedido) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "ItemPedido{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            ", precio=" + getPrecio() +
            ", tiempoPreparacion=" + getTiempoPreparacion() +
            "}";
    }
}
