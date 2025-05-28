import { KeyValueItem } from "@/components/KeyValueItem";
import { formatDate, formatMoney } from "@/lib/utils";
import { OfertaFormacion } from "@/schemas/oferta-formacion";

interface Props {
  oferta: OfertaFormacion;
}

export default function OfertaFormacionInfo({ oferta }: Props) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <KeyValueItem
        icon="material-symbols:barcode-scanner-rounded"
        label="Código"
        values={oferta.id}
      />
      <KeyValueItem
        icon="material-symbols:numbers-rounded"
        label="Id. CINE"
        values={oferta.cine}
      />
      <KeyValueItem
        icon="ic:round-plus"
        label="Extensión"
        values={oferta.extension ? "Sí" : "No"}
      />
      <div className="flex gap-4">
        <KeyValueItem
          icon="material-symbols:calendar-month-outline-rounded"
          label="Inicio"
          values={formatDate(oferta.fecha_inicio, "dd/MM/yyyy")}
        />
        <KeyValueItem
          label="Fin"
          values={formatDate(oferta.fecha_fin, "dd/MM/yyyy")}
        />
      </div>
      <KeyValueItem
        icon="material-symbols:nest-clock-farsight-analog-outline-rounded"
        label="Horas"
        values={oferta.horas}
      />
      <KeyValueItem
        icon="material-symbols:deployed-code-outline-sharp"
        label="Tipo"
        values={oferta.tipo_oferta.nombre}
      />
      <KeyValueItem
        icon="material-symbols:category-outline-rounded"
        label="Categoría"
        values={oferta.categoria.nombre}
      />
      <KeyValueItem
        icon="material-symbols:person-outline-rounded"
        label="Tipos de beneficiario"
        values={oferta.tipos_beneficiario.map((e) => e.nombre)}
      />
      <KeyValueItem
        icon="material-symbols:person-outline-rounded"
        label="Beneficiarios"
        values={oferta.inscritos.length}
      />
      <KeyValueItem
        icon="material-symbols:calendar-month-outline-rounded"
        label="Semestre"
        values={oferta.semestre}
      />
      <KeyValueItem
        icon="material-symbols:price-change-outline-rounded"
        label="Valor"
        values={formatMoney(oferta.valor)}
      />

      {oferta.instituciones.length > 0 && (
        <KeyValueItem
          icon="fluent:building-24-regular"
          label="Instituciones"
          values={oferta.instituciones.map((e) => e.nombre)}
        />
      )}
    </div>
  );
}
