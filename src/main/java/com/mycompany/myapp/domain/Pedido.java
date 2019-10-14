package com.mycompany.myapp.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.HashSet;
import java.util.Set;

/**
 * A Pedido.
 */
@Entity
@Table(name = "pedido")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Pedido implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "num_pedido")
    private Integer numPedido;

    @Column(name = "fecha_pedido")
    private ZonedDateTime fechaPedido;

    @Column(name = "precio", precision = 21, scale = 2)
    private BigDecimal precio;

    @Column(name = "observaciones_precio")
    private String observacionesPrecio;

    @ManyToOne
    @JsonIgnoreProperties("pedidos")
    private Mesa mesa;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "pedido_menu",
               joinColumns = @JoinColumn(name = "pedido_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "menu_id", referencedColumnName = "id"))
    private Set<Menu> menus = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "pedido_item_pedido",
               joinColumns = @JoinColumn(name = "pedido_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "item_pedido_id", referencedColumnName = "id"))
    private Set<ItemPedido> itemPedidos = new HashSet<>();

    @OneToMany(mappedBy = "pedido")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Valoracion> valoracions = new HashSet<>();

    @OneToMany(mappedBy = "pedido")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<PagoPedido> pagos = new HashSet<>();

    @OneToMany(mappedBy = "pedido")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<StatusItemPedido> statuses = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNumPedido() {
        return numPedido;
    }

    public Pedido numPedido(Integer numPedido) {
        this.numPedido = numPedido;
        return this;
    }

    public void setNumPedido(Integer numPedido) {
        this.numPedido = numPedido;
    }

    public ZonedDateTime getFechaPedido() {
        return fechaPedido;
    }

    public Pedido fechaPedido(ZonedDateTime fechaPedido) {
        this.fechaPedido = fechaPedido;
        return this;
    }

    public void setFechaPedido(ZonedDateTime fechaPedido) {
        this.fechaPedido = fechaPedido;
    }

    public BigDecimal getPrecio() {
        return precio;
    }

    public Pedido precio(BigDecimal precio) {
        this.precio = precio;
        return this;
    }

    public void setPrecio(BigDecimal precio) {
        this.precio = precio;
    }

    public String getObservacionesPrecio() {
        return observacionesPrecio;
    }

    public Pedido observacionesPrecio(String observacionesPrecio) {
        this.observacionesPrecio = observacionesPrecio;
        return this;
    }

    public void setObservacionesPrecio(String observacionesPrecio) {
        this.observacionesPrecio = observacionesPrecio;
    }

    public Mesa getMesa() {
        return mesa;
    }

    public Pedido mesa(Mesa mesa) {
        this.mesa = mesa;
        return this;
    }

    public void setMesa(Mesa mesa) {
        this.mesa = mesa;
    }

    public Set<Menu> getMenus() {
        return menus;
    }

    public Pedido menus(Set<Menu> menus) {
        this.menus = menus;
        return this;
    }

    public Pedido addMenu(Menu menu) {
        this.menus.add(menu);
        menu.getPedidos().add(this);
        return this;
    }

    public Pedido removeMenu(Menu menu) {
        this.menus.remove(menu);
        menu.getPedidos().remove(this);
        return this;
    }

    public void setMenus(Set<Menu> menus) {
        this.menus = menus;
    }

    public Set<ItemPedido> getItemPedidos() {
        return itemPedidos;
    }

    public Pedido itemPedidos(Set<ItemPedido> itemPedidos) {
        this.itemPedidos = itemPedidos;
        return this;
    }

    public Pedido addItemPedido(ItemPedido itemPedido) {
        this.itemPedidos.add(itemPedido);
        itemPedido.getPedidos().add(this);
        return this;
    }

    public Pedido removeItemPedido(ItemPedido itemPedido) {
        this.itemPedidos.remove(itemPedido);
        itemPedido.getPedidos().remove(this);
        return this;
    }

    public void setItemPedidos(Set<ItemPedido> itemPedidos) {
        this.itemPedidos = itemPedidos;
    }

    public Set<Valoracion> getValoracions() {
        return valoracions;
    }

    public Pedido valoracions(Set<Valoracion> valoracions) {
        this.valoracions = valoracions;
        return this;
    }

    public Pedido addValoracion(Valoracion valoracion) {
        this.valoracions.add(valoracion);
        valoracion.setPedido(this);
        return this;
    }

    public Pedido removeValoracion(Valoracion valoracion) {
        this.valoracions.remove(valoracion);
        valoracion.setPedido(null);
        return this;
    }

    public void setValoracions(Set<Valoracion> valoracions) {
        this.valoracions = valoracions;
    }

    public Set<PagoPedido> getPagos() {
        return pagos;
    }

    public Pedido pagos(Set<PagoPedido> pagoPedidos) {
        this.pagos = pagoPedidos;
        return this;
    }

    public Pedido addPago(PagoPedido pagoPedido) {
        this.pagos.add(pagoPedido);
        pagoPedido.setPedido(this);
        return this;
    }

    public Pedido removePago(PagoPedido pagoPedido) {
        this.pagos.remove(pagoPedido);
        pagoPedido.setPedido(null);
        return this;
    }

    public void setPagos(Set<PagoPedido> pagoPedidos) {
        this.pagos = pagoPedidos;
    }

    public Set<StatusItemPedido> getStatuses() {
        return statuses;
    }

    public Pedido statuses(Set<StatusItemPedido> statusItemPedidos) {
        this.statuses = statusItemPedidos;
        return this;
    }

    public Pedido addStatus(StatusItemPedido statusItemPedido) {
        this.statuses.add(statusItemPedido);
        statusItemPedido.setPedido(this);
        return this;
    }

    public Pedido removeStatus(StatusItemPedido statusItemPedido) {
        this.statuses.remove(statusItemPedido);
        statusItemPedido.setPedido(null);
        return this;
    }

    public void setStatuses(Set<StatusItemPedido> statusItemPedidos) {
        this.statuses = statusItemPedidos;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Pedido)) {
            return false;
        }
        return id != null && id.equals(((Pedido) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Pedido{" +
            "id=" + getId() +
            ", numPedido=" + getNumPedido() +
            ", fechaPedido='" + getFechaPedido() + "'" +
            ", precio=" + getPrecio() +
            ", observacionesPrecio='" + getObservacionesPrecio() + "'" +
            "}";
    }
}
