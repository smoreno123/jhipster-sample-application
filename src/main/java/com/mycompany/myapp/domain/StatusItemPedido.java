package com.mycompany.myapp.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;

/**
 * A StatusItemPedido.
 */
@Entity
@Table(name = "status_item_pedido")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class StatusItemPedido implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "preparado")
    private Boolean preparado;

    @Column(name = "hora_inicio")
    private ZonedDateTime horaInicio;

    @Column(name = "hora_finalizacion")
    private ZonedDateTime horaFinalizacion;

    @ManyToOne
    @JsonIgnoreProperties("statuses")
    private Pedido pedido;

    @ManyToOne
    @JsonIgnoreProperties("statuses")
    private ItemPedido itemPedido;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isPreparado() {
        return preparado;
    }

    public StatusItemPedido preparado(Boolean preparado) {
        this.preparado = preparado;
        return this;
    }

    public void setPreparado(Boolean preparado) {
        this.preparado = preparado;
    }

    public ZonedDateTime getHoraInicio() {
        return horaInicio;
    }

    public StatusItemPedido horaInicio(ZonedDateTime horaInicio) {
        this.horaInicio = horaInicio;
        return this;
    }

    public void setHoraInicio(ZonedDateTime horaInicio) {
        this.horaInicio = horaInicio;
    }

    public ZonedDateTime getHoraFinalizacion() {
        return horaFinalizacion;
    }

    public StatusItemPedido horaFinalizacion(ZonedDateTime horaFinalizacion) {
        this.horaFinalizacion = horaFinalizacion;
        return this;
    }

    public void setHoraFinalizacion(ZonedDateTime horaFinalizacion) {
        this.horaFinalizacion = horaFinalizacion;
    }

    public Pedido getPedido() {
        return pedido;
    }

    public StatusItemPedido pedido(Pedido pedido) {
        this.pedido = pedido;
        return this;
    }

    public void setPedido(Pedido pedido) {
        this.pedido = pedido;
    }

    public ItemPedido getItemPedido() {
        return itemPedido;
    }

    public StatusItemPedido itemPedido(ItemPedido itemPedido) {
        this.itemPedido = itemPedido;
        return this;
    }

    public void setItemPedido(ItemPedido itemPedido) {
        this.itemPedido = itemPedido;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof StatusItemPedido)) {
            return false;
        }
        return id != null && id.equals(((StatusItemPedido) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "StatusItemPedido{" +
            "id=" + getId() +
            ", preparado='" + isPreparado() + "'" +
            ", horaInicio='" + getHoraInicio() + "'" +
            ", horaFinalizacion='" + getHoraFinalizacion() + "'" +
            "}";
    }
}
