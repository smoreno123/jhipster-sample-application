package com.mycompany.myapp.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.ZonedDateTime;

/**
 * A Valoracion.
 */
@Entity
@Table(name = "valoracion")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Valoracion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nota")
    private Integer nota;

    @Column(name = "observaciones")
    private String observaciones;

    @Column(name = "fecha")
    private ZonedDateTime fecha;

    @ManyToOne
    @JsonIgnoreProperties("valoracions")
    private Pedido pedido;

    @ManyToOne
    @JsonIgnoreProperties("valoracions")
    private ItemPedido itemPedido;

    @ManyToOne
    @JsonIgnoreProperties("valoracions")
    private Comensal comensal;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNota() {
        return nota;
    }

    public Valoracion nota(Integer nota) {
        this.nota = nota;
        return this;
    }

    public void setNota(Integer nota) {
        this.nota = nota;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public Valoracion observaciones(String observaciones) {
        this.observaciones = observaciones;
        return this;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }

    public ZonedDateTime getFecha() {
        return fecha;
    }

    public Valoracion fecha(ZonedDateTime fecha) {
        this.fecha = fecha;
        return this;
    }

    public void setFecha(ZonedDateTime fecha) {
        this.fecha = fecha;
    }

    public Pedido getPedido() {
        return pedido;
    }

    public Valoracion pedido(Pedido pedido) {
        this.pedido = pedido;
        return this;
    }

    public void setPedido(Pedido pedido) {
        this.pedido = pedido;
    }

    public ItemPedido getItemPedido() {
        return itemPedido;
    }

    public Valoracion itemPedido(ItemPedido itemPedido) {
        this.itemPedido = itemPedido;
        return this;
    }

    public void setItemPedido(ItemPedido itemPedido) {
        this.itemPedido = itemPedido;
    }

    public Comensal getComensal() {
        return comensal;
    }

    public Valoracion comensal(Comensal comensal) {
        this.comensal = comensal;
        return this;
    }

    public void setComensal(Comensal comensal) {
        this.comensal = comensal;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Valoracion)) {
            return false;
        }
        return id != null && id.equals(((Valoracion) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Valoracion{" +
            "id=" + getId() +
            ", nota=" + getNota() +
            ", observaciones='" + getObservaciones() + "'" +
            ", fecha='" + getFecha() + "'" +
            "}";
    }
}
