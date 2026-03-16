import { useState } from "react";

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxJGxYaNFU2ZryYqDOOvVdNS3WkQeqAMqPDdyVGupG9_GEymwgcXRKR7oji7TOOuGv_xg/exec";
const LOGO = "data:image/jpeg;base64,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";

const TERMINOS = `TÉRMINOS Y CONDICIONES — TERRAMATCH

¡Bienvenido a TerraMatch! Estos términos y condiciones describen la relación contractual entre TERRAMATCH S.A.S., NIT 901.612.770-8 ("TerraMatch") y Tú, nuestro Usuario.

¿QUÉ ES TERRAMATCH?
TerraMatch es una plataforma web inteligente que conecta Usuarios que quieran arrendar o vender un local comercial, con Usuarios que quieran tomarlo en arriendo o comprarlo.

CONTRAPRESTACIÓN
• Arrendamiento: 30% sobre el valor del primer canon de arrendamiento.
• Compraventa: 30% sobre el 3% del valor total de venta del inmueble.
• Si eres arrendatario o comprador, no pagas nada a TerraMatch.
• TerraMatch solo cobra si se cierra la negociación.

CUENTA BANCARIA TERRAMATCH
Iris Bank · Cuenta de Ahorros 100012022193 · NIT 901.612.770-8

OBLIGACIONES DEL USUARIO
• Atender obligaciones legales y tributarias.
• Tener capacidad legal para ofrecer el Local.
• Llenar los formularios con información cierta y fidedigna.
• Permitir que TerraMatch acceda al Local para coordinar visitas.
• Responder directamente ante los demás Usuarios por los contratos celebrados.

RESPONSABILIDAD
TerraMatch no garantiza que habrá un Match ni que se celebrará un contrato. En cualquier caso, la responsabilidad de TerraMatch se limitará a COP$1.000.000.

DATOS PERSONALES
TerraMatch tratará tus datos conforme a su Política de Privacidad y la Ley 1581 de 2012. Tu información será confidencial hasta que se firme el contrato.

CONTROVERSIAS
Las controversias se someterán a arreglo directo por 30 días. De no resolverse, serán conocidas por los jueces ordinarios de Colombia.

NOTIFICACIONES
TerraMatch: locales@terramatch.net
Tú: al correo y/o celular registrado en el formulario.

Última modificación: agosto 2023`;

const STEPS = [
  { id: "tipo", label: "Tipo", icon: "⚡" },
  { id: "identificacion", label: "Identificación", icon: "👤" },
  { id: "ubicacion", label: "Ubicación", icon: "📍" },
  { id: "inmueble", label: "Inmueble", icon: "🏢" },
  { id: "economico", label: "Económico", icon: "💰" },
  { id: "decision", label: "Decisión", icon: "⚑" },
  { id: "resumen", label: "Resumen", icon: "✅" },
];

const initialData = {
  modo: "", nombre: "", identificacion: "", matricula: "", direccion: "",
  contacto: "", email: "", telefono: "", ciudad: "", cantidadLocales: "", actividadNegocio: "",
  ciudadBusqueda: "", barrioZona: "", zonasAceptables: "", zonasNoAceptadas: "",
  permisoConstructura: "", accesosRequeridos: [], tipoNegocio: "", usoSuelo: [],
  areaTotalMin: "", areaTotalMax: "", alturaLibre: "", parqueaderos: "",
  caracteristicas: [], instalaciones: [], presupuestoCompra: "", canonMaximo: "",
  adminMaxima: "", financiacion: "", precioVenta: "", canonArriendo: "", adminMensual: "",
  plazoContrato: [], documentos: [], plazoDecision: "", fechaCierre: "", acelerador: "",
  bloqueador: "", gestionParalela: "", observaciones: "",
};

const CheckGroup = ({ label, options, value = [], onChange, color = "#CC0000" }) => (
  <div style={{ marginBottom: 16 }}>
    <div style={{ fontSize: 11, fontWeight: 700, color: "#1A1A2E", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</div>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {options.map(opt => {
        const active = value.includes(opt);
        return (
          <button key={opt} onClick={() => onChange(active ? value.filter(v => v !== opt) : [...value, opt])}
            style={{ padding: "7px 14px", borderRadius: 6, border: `2px solid ${active ? color : "#DDD"}`, background: active ? color : "#FAFAFA", color: active ? "#FFF" : "#3D3D3D", fontSize: 12, fontFamily: "'DM Sans', sans-serif", fontWeight: active ? 700 : 400, cursor: "pointer", transition: "all 0.15s", display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 10 }}>{active ? "✓" : "○"}</span>{opt}
          </button>
        );
      })}
    </div>
  </div>
);

const RadioGroup = ({ label, options, value, onChange, color = "#CC0000", highlight = false }) => (
  <div style={{ marginBottom: 16, ...(highlight ? { background: "#FFF8E7", border: "2px solid #E8A020", borderRadius: 10, padding: 14 } : {}) }}>
    <div style={{ fontSize: 11, fontWeight: 700, color: highlight ? "#6B4800" : "#1A1A2E", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</div>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {options.map(opt => {
        const active = value === opt;
        return (
          <button key={opt} onClick={() => onChange(opt)}
            style={{ padding: "7px 14px", borderRadius: 6, border: `2px solid ${active ? color : "#DDD"}`, background: active ? color : "#FAFAFA", color: active ? "#FFF" : "#3D3D3D", fontSize: 12, fontFamily: "'DM Sans', sans-serif", fontWeight: active ? 700 : 400, cursor: "pointer", transition: "all 0.15s", display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 10 }}>{active ? "✓" : "○"}</span>{opt}
          </button>
        );
      })}
    </div>
  </div>
);

const Field = ({ label, value, onChange, placeholder = "", type = "text", required = false, note = "" }) => (
  <div style={{ marginBottom: 16 }}>
    <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#1A1A2E", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>
      {label}{required && <span style={{ color: "#CC0000", marginLeft: 3 }}>*</span>}
    </label>
    {note && <div style={{ fontSize: 11, color: "#888", marginBottom: 6, fontStyle: "italic" }}>{note}</div>}
    <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      style={{ width: "100%", padding: "10px 14px", border: "none", borderBottom: "2px solid #CC0000", background: "#F9F9F9", borderRadius: "6px 6px 0 0", fontSize: 13, fontFamily: "'DM Sans', sans-serif", color: "#1A1A2E", outline: "none", boxSizing: "border-box" }}
      onFocus={e => e.target.style.borderBottomColor = "#1A1A2E"}
      onBlur={e => e.target.style.borderBottomColor = "#CC0000"} />
  </div>
);

const TextArea = ({ label, value, onChange, placeholder = "" }) => (
  <div style={{ marginBottom: 16 }}>
    <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#1A1A2E", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</label>
    <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={3}
      style={{ width: "100%", padding: "10px 14px", border: "none", borderBottom: "2px solid #CC0000", background: "#F9F9F9", borderRadius: "6px 6px 0 0", fontSize: 13, fontFamily: "'DM Sans', sans-serif", color: "#1A1A2E", outline: "none", resize: "vertical", boxSizing: "border-box" }} />
  </div>
);

const TwoCol = ({ children }) => <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>{children}</div>;

const SectionTitle = ({ icon, title, subtitle, color = "#1A1A2E" }) => (
  <div style={{ marginBottom: 24 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
      <span style={{ fontSize: 20 }}>{icon}</span>
      <h2 style={{ margin: 0, fontSize: 16, fontWeight: 800, color, fontFamily: "'Syne', sans-serif", letterSpacing: "-0.01em" }}>{title}</h2>
    </div>
    {subtitle && <p style={{ margin: "4px 0 0 30px", fontSize: 12, color: "#888", fontStyle: "italic" }}>{subtitle}</p>}
    <div style={{ height: 2, background: `linear-gradient(to right, ${color}, transparent)`, marginTop: 10, borderRadius: 2 }} />
  </div>
);

const KeySection = ({ children }) => (
  <div style={{ background: "linear-gradient(135deg, #FFF8E7 0%, #FFF3CD 100%)", border: "2px solid #E8A020", borderRadius: 12, padding: 20, marginBottom: 8 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
      <span style={{ fontSize: 18 }}>⚑</span>
      <h2 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: "#6B4800", fontFamily: "'Syne', sans-serif" }}>HORIZONTE DE DECISIÓN — CAMPO CLAVE</h2>
    </div>
    <p style={{ margin: "0 0 16px", fontSize: 12, color: "#8B5E00", fontStyle: "italic", lineHeight: 1.5 }}>
      Define el momento real de cierre. Permite priorizar la búsqueda, manejar la relación con propietarios con honestidad y evitar desgaste innecesario para ambas partes.
    </p>
    {children}
  </div>
);

const Resumen = ({ data, onReset }) => {
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [aceptado, setAceptado] = useState(false);
  const [verTerminos, setVerTerminos] = useState(false);

  const enviar = async () => {
    setEnviando(true);
    try {
      await fetch(SCRIPT_URL, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain" }, body: JSON.stringify(data) });
      setEnviado(true);
    } catch (err) {
      alert("❌ Error al enviar. Verifica tu conexión e intenta de nuevo.");
    }
    setEnviando(false);
  };

  const rows = [
    ["Modo", data.modo], ["Nombre", data.nombre], ["Identificación", data.identificacion],
    ["Email", data.email], ["Teléfono", data.telefono], ["Ciudad", data.ciudad || data.ciudadBusqueda],
    ...(data.modo === "Busco Locales" ? [["Cantidad de locales", data.cantidadLocales], ["Actividad / Uso", data.actividadNegocio]] : []),
    ["Barrio / Zona", data.barrioZona], ["Tipo de negocio", data.tipoNegocio],
    ["Uso del suelo", (data.usoSuelo || []).join(", ")], ["Área mín. (m²)", data.areaTotalMin], ["Área máx. (m²)", data.areaTotalMax],
    ["Características", (data.caracteristicas || []).join(", ")], ["Plazo del contrato", (data.plazoContrato || []).join(", ")],
    ...(data.modo === "Busco Locales" ? [["Presupuesto máx. compra", data.presupuestoCompra], ["Canon máximo", data.canonMaximo]] : [["Precio de venta", data.precioVenta], ["Canon de arriendo", data.canonArriendo]]),
    ["⚑ Plazo de decisión", data.plazoDecision], ["⚑ Fecha estimada de cierre", data.fechaCierre],
    ["⚑ Acelerador", data.acelerador], ["⚑ Bloqueador", data.bloqueador], ["Observaciones", data.observaciones],
  ].filter(([, v]) => v && String(v).trim());

  if (enviado) {
    return (
      <div style={{ textAlign: "center", padding: "40px 20px" }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1A1A2E", fontFamily: "'Syne', sans-serif", marginBottom: 8 }}>IUB enviado correctamente</h2>
        <p style={{ color: "#666", fontSize: 14, marginBottom: 8 }}>Los datos llegaron a Google Sheets y recibirás un correo de confirmación.</p>
        <p style={{ color: "#888", fontSize: 12, marginBottom: 32 }}>Revisa tu bandeja de entrada en Gmail.</p>
        <button onClick={onReset} style={{ padding: "12px 32px", background: "linear-gradient(135deg, #CC0000, #990000)", color: "#FFF", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
          Diligenciar otro IUB
        </button>
      </div>
    );
  }

  return (
    <div>
      <SectionTitle icon="✅" title="RESUMEN DEL IUB" subtitle="Revisa la información antes de enviar" color="#1A1A2E" />
      <div style={{ background: "#F9F9F9", borderRadius: 10, border: "1px solid #E8E8E8", overflow: "hidden", marginBottom: 20 }}>
        {rows.map(([k, v], i) => (
          <div key={k} style={{ display: "grid", gridTemplateColumns: "200px 1fr", padding: "10px 16px", background: i % 2 === 0 ? "#FFF" : "#F9F9F9", borderBottom: "1px solid #F0F0F0", alignItems: "start" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: k.startsWith("⚑") ? "#8B5E00" : "#888", textTransform: "uppercase", letterSpacing: "0.06em", paddingRight: 8 }}>{k}</div>
            <div style={{ fontSize: 13, color: "#1A1A2E" }}>{v}</div>
          </div>
        ))}
      </div>
      <div style={{ background: "#F9F9F9", border: "1px solid #E8E8E8", borderRadius: 10, padding: 16, marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: verTerminos ? 12 : 0 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#1A1A2E", textTransform: "uppercase", letterSpacing: "0.06em" }}>📄 Términos y Condiciones Terramatch</div>
          <button onClick={() => setVerTerminos(!verTerminos)} style={{ fontSize: 11, color: "#CC0000", fontWeight: 700, background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
            {verTerminos ? "Ocultar ▲" : "Leer ▼"}
          </button>
        </div>
        {verTerminos && (
          <div style={{ maxHeight: 220, overflowY: "auto", background: "#FFF", border: "1px solid #E0E0E0", borderRadius: 6, padding: 12, marginBottom: 12, fontSize: 11, color: "#444", lineHeight: 1.7, whiteSpace: "pre-wrap", fontFamily: "'DM Sans', sans-serif" }}>
            {TERMINOS}
          </div>
        )}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginTop: 10, cursor: "pointer" }} onClick={() => setAceptado(!aceptado)}>
          <div style={{ width: 18, height: 18, minWidth: 18, borderRadius: 4, border: `2px solid ${aceptado ? "#CC0000" : "#BBB"}`, background: aceptado ? "#CC0000" : "#FFF", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>
            {aceptado && <span style={{ color: "#FFF", fontSize: 11, fontWeight: 900 }}>✓</span>}
          </div>
          <span style={{ fontSize: 12, color: "#444", lineHeight: 1.5 }}>
            He leído y acepto los <span style={{ color: "#CC0000", fontWeight: 700 }}>Términos y Condiciones de Terramatch</span>, incluyendo la política de tratamiento de datos personales conforme a la Ley 1581 de 2012.
          </span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        <button onClick={enviar} disabled={enviando || !aceptado} style={{ flex: 1, padding: "14px 0", background: enviando || !aceptado ? "#CCC" : "linear-gradient(135deg, #CC0000, #990000)", color: "#FFF", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: enviando || !aceptado ? "not-allowed" : "pointer", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.05em" }}>
          {enviando ? "Enviando..." : "ENVIAR IUB ✓"}
        </button>
        <button onClick={onReset} style={{ padding: "14px 20px", background: "#F0F0F0", color: "#555", border: "none", borderRadius: 8, fontSize: 13, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
          Nuevo
        </button>
      </div>
    </div>
  );
};

export default function IUBTerramatch() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState(initialData);
  const set = (key) => (val) => setData(d => ({ ...d, [key]: val }));
  const isBusco = data.modo === "Busco Locales";
  const canNext = () => { if (step === 0) return !!data.modo; if (step === 1) return !!data.nombre && !!data.email; return true; };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div style={{ padding: "48px 0 40px" }}>
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.18em", color: "#CC0000", textTransform: "uppercase", marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ display: "block", width: 24, height: 1, background: "#CC0000" }}></span>
                Indicador Único de Búsqueda
              </div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 36, fontWeight: 800, color: "#FFFFFF", lineHeight: 1.08, letterSpacing: "-0.03em", marginBottom: 14 }}>
                Encuentra tu<br /><span style={{ color: "#CC0000" }}>match</span> perfecto.
              </div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, maxWidth: 380, fontWeight: 300 }}>
                Estandarizamos los requerimientos inmobiliarios para conectar propietarios y empresarios sin intermediarios innecesarios.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, maxWidth: 520 }}>
              {["Tengo Locales", "Busco Locales"].map(opt => {
                const active = data.modo === opt;
                const icon = opt === "Tengo Locales" ? "🏪" : "🔍";
                const desc = opt === "Tengo Locales" ? "Soy propietario o inmobiliaria y quiero publicar un inmueble comercial." : "Soy empresario o persona natural y necesito encontrar el local ideal.";
                return (
                  <button key={opt} onClick={() => set("modo")(opt)} style={{ padding: 20, borderRadius: 10, border: `1px solid ${active ? "#CC0000" : "rgba(255,255,255,0.1)"}`, background: active ? "rgba(204,0,0,0.1)" : "rgba(255,255,255,0.03)", cursor: "pointer", textAlign: "left", transition: "all 0.2s" }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(204,0,0,0.15)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14, fontSize: 16 }}>{icon}</div>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14, color: active ? "#FF4444" : "#FFF", marginBottom: 6 }}>{opt}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", lineHeight: 1.55, fontWeight: 300 }}>{desc}</div>
                    {active && <div style={{ marginTop: 10, fontSize: 9, color: "#CC0000", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>✓ Seleccionado</div>}
                  </button>
                );
              })}
            </div>
          </div>
        );
      case 1:
        return (
          <div>
            <SectionTitle icon="👤" title="IDENTIFICACIÓN DE LAS PARTES" color="#1A1A2E" />
            <Field label={isBusco ? "Nombre / Empresa" : "Nombre / Inmobiliaria / Propietario"} value={data.nombre} onChange={set("nombre")} required />
            <TwoCol>
              <Field label="# Identificación (C.C. / NIT)" value={data.identificacion} onChange={set("identificacion")} />
              <Field label={isBusco ? "Cargo / Rol" : "Matrícula Inmobiliaria"} value={data.matricula} onChange={set("matricula")} />
            </TwoCol>
            <Field label="Dirección" value={data.direccion} onChange={set("direccion")} />
            <TwoCol>
              <Field label="Contacto" value={data.contacto} onChange={set("contacto")} />
              <Field label="Teléfono / WhatsApp" value={data.telefono} onChange={set("telefono")} type="tel" />
            </TwoCol>
            <Field label="Email" value={data.email} onChange={set("email")} type="email" required />
            <Field label="Ciudad Principal" value={data.ciudad} onChange={set("ciudad")} />
            {isBusco && <TwoCol>
              <Field label="Cantidad de Locales" value={data.cantidadLocales} onChange={set("cantidadLocales")} note="¿Cuántos locales busca?" />
              <Field label="Actividad / Uso del Negocio" value={data.actividadNegocio} onChange={set("actividadNegocio")} note="Ej: restaurante, boutique…" />
            </TwoCol>}
          </div>
        );
      case 2:
        return (
          <div>
            <SectionTitle icon="📍" title="ESPECIFICACIONES DE UBICACIÓN" color="#CC0000" />
            <Field label="Ciudad / Municipio" value={data.ciudadBusqueda} onChange={set("ciudadBusqueda")} />
            <Field label="Barrio / Zona preferida" value={data.barrioZona} onChange={set("barrioZona")} />
            {isBusco ? <>
              <Field label="Zonas / Sectores aceptables" value={data.zonasAceptables} onChange={set("zonasAceptables")} />
              <Field label="Sectores NO aceptados" value={data.zonasNoAceptadas} onChange={set("zonasNoAceptadas")} />
              <CheckGroup label="Accesos requeridos" value={data.accesosRequeridos} onChange={set("accesosRequeridos")} color="#CC0000" options={["Vía principal", "Doble calzada", "Centro Comercial", "Isla", "Plazoleta de comidas", "Parking propio"]} />
            </> : <>
              <Field label="Dirección del Inmueble" value={data.zonasAceptables} onChange={set("zonasAceptables")} />
              <RadioGroup label="Permiso de Construcción" value={data.permisoConstructura} onChange={set("permisoConstructura")} color="#CC0000" options={["Sí cuenta", "No cuenta", "En trámite"]} />
            </>}
          </div>
        );
      case 3:
        return (
          <div>
            <SectionTitle icon="🏢" title="CARACTERÍSTICAS DEL INMUEBLE" color="#2C3E6B" />
            <RadioGroup label="Tipo de Negocio" value={data.tipoNegocio} onChange={set("tipoNegocio")} color="#2C3E6B" options={["Arriendo", "Venta", "Leasing comercial"]} />
            <CheckGroup label="Uso del Suelo" value={data.usoSuelo} onChange={set("usoSuelo")} color="#2C3E6B" options={["Mixto", "Comercial", "Industrial", "Residencial"]} />
            <TwoCol>
              <Field label={isBusco ? "Área mínima (m²)" : "Área Total (m²)"} value={data.areaTotalMin} onChange={set("areaTotalMin")} type="number" />
              <Field label={isBusco ? "Área máxima (m²)" : "Área Construida (m²)"} value={data.areaTotalMax} onChange={set("areaTotalMax")} type="number" />
            </TwoCol>
            <TwoCol>
              <Field label="Altura Libre Mínima (m)" value={data.alturaLibre} onChange={set("alturaLibre")} />
              <Field label="Parqueaderos mínimos" value={data.parqueaderos} onChange={set("parqueaderos")} />
            </TwoCol>
            <CheckGroup label="Características Especiales" value={data.caracteristicas} onChange={set("caracteristicas")} color="#2C3E6B" options={["Esquinero", "Vía Principal", "Vía Secundaria", "Doble Altura", "Mezzanine", "Terraza / Patio", "Sótano", "Doble Frente"]} />
            {isBusco && <CheckGroup label="Instalaciones Requeridas" value={data.instalaciones} onChange={set("instalaciones")} color="#2C3E6B" options={["Extracción", "Cocina industrial", "Refrigeración", "Carga eléctrica reforzada", "Gas natural"]} />}
          </div>
        );
      case 4:
        return (
          <div>
            <SectionTitle icon="💰" title="CONDICIONES ECONÓMICAS" color="#4A4A6A" />
            {isBusco ? <>
              <TwoCol>
                <Field label="Presupuesto máx. Compra ($)" value={data.presupuestoCompra} onChange={set("presupuestoCompra")} placeholder="$ 0" />
                <Field label="Canon mensual máximo ($)" value={data.canonMaximo} onChange={set("canonMaximo")} placeholder="$ 0" />
              </TwoCol>
              <Field label="Administración mensual máxima ($)" value={data.adminMaxima} onChange={set("adminMaxima")} placeholder="$ 0" />
              <RadioGroup label="Financiación" value={data.financiacion} onChange={set("financiacion")} color="#4A4A6A" options={["Ya aprobada", "En trámite", "No requiere"]} />
            </> : <>
              <TwoCol>
                <Field label="Precio de Venta ($) / Precio m²" value={data.precioVenta} onChange={set("precioVenta")} placeholder="$ 0" />
                <Field label="Canon de Arriendo mensual ($)" value={data.canonArriendo} onChange={set("canonArriendo")} placeholder="$ 0" />
              </TwoCol>
              <Field label="Administración mensual ($)" value={data.adminMensual} onChange={set("adminMensual")} placeholder="$ 0" />
              <CheckGroup label="Documentos Disponibles" value={data.documentos} onChange={set("documentos")} color="#4A4A6A" options={["Fotos", "PDF planos", "JPG", "DWG / CAD", "Escritura"]} />
            </>}
            <CheckGroup label="Plazo del Contrato (años)" value={data.plazoContrato} onChange={set("plazoContrato")} color="#4A4A6A" options={["3 años", "5 años", "10 años", "Más de 10", "Negociación abierta"]} />
          </div>
        );
      case 5:
        return (
          <div>
            <KeySection>
              <RadioGroup label="Plazo para tomar la decisión" value={data.plazoDecision} onChange={set("plazoDecision")} color="#E8A020" options={["Inmediato (0–1 mes)", "Corto (1–3 meses)", "Mediano (3–6 meses)", "Largo (+6 meses)"]} highlight />
              <Field label="Fecha estimada de cierre del negocio" value={data.fechaCierre} onChange={set("fechaCierre")} type="date" />
              <Field label="¿Qué condición aceleraría la decisión?" value={data.acelerador} onChange={set("acelerador")} placeholder="Ej: encontrar el área exacta, precio dentro del presupuesto…" />
              <Field label="¿Qué podría retrasar o cancelar la búsqueda?" value={data.bloqueador} onChange={set("bloqueador")} placeholder="Ej: situación financiera pendiente, expansión condicionada…" />
              {isBusco && <RadioGroup label="¿Revisa otras opciones en paralelo?" value={data.gestionParalela} onChange={set("gestionParalela")} color="#E8A020" options={["No, gestión exclusiva Terramatch", "Sí, con otros gestores", "Sí, directamente con propietarios"]} highlight />}
            </KeySection>
            <TextArea label="Observaciones Adicionales" value={data.observaciones} onChange={set("observaciones")} placeholder="Cualquier detalle importante no contemplado en el formulario…" />
          </div>
        );
      case 6:
        return <Resumen data={data} onReset={() => { setData(initialData); setStep(0); }} />;
      default: return null;
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0D0F1A; }
        input:focus, textarea:focus { outline: none; }
        button:focus { outline: none; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #1A1C2E; }
        ::-webkit-scrollbar-thumb { background: #CC0000; border-radius: 2px; }
      `}</style>
      <div style={{ minHeight: "100vh", background: step === 0 ? "#0D0F1A" : "#F0F0F4", fontFamily: "'DM Sans', sans-serif", padding: "0 0 40px" }}>

        {/* TOP BAR */}
        <div style={{ background: "#0D0F1A", borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <img src={LOGO} alt="Terramatch" style={{ height: 34, objectFit: "contain", borderRadius: 6, background: "#FFF", padding: "3px 6px" }} />
            <span style={{ width: 1, height: 20, background: "rgba(255,255,255,0.15)" }} />
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", letterSpacing: "0.14em", textTransform: "uppercase" }}>IUB — Indicador Único de Búsqueda</span>
          </div>
          {data.modo && step > 0 && <div style={{ fontSize: 10, color: "#CC0000", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>
            {data.modo === "Busco Locales" ? "🔍" : "🏪"} {data.modo}
          </div>}
        </div>

        {/* PROGRESS BAR */}
        {step > 0 && (
          <div style={{ background: "#FFF", borderBottom: "1px solid #E8E8E8", padding: "0 24px" }}>
            <div style={{ display: "flex", maxWidth: 720, margin: "0 auto" }}>
              {STEPS.slice(1).map((s, i) => {
                const idx = i + 1; const done = step > idx; const active = step === idx;
                return (
                  <div key={s.id} onClick={() => done && setStep(idx)} style={{ flex: 1, padding: "10px 4px", textAlign: "center", cursor: done ? "pointer" : "default", position: "relative" }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: active ? "#CC0000" : done ? "#4CAF50" : "#BBB", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                      {done ? "✓ " : ""}{s.label}
                    </div>
                    {active && <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: "#CC0000", borderRadius: 1 }} />}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* MAIN CONTENT */}
        <div style={{ maxWidth: 720, margin: step === 0 ? "0 auto" : "32px auto 0", padding: step === 0 ? "0 28px" : "0 16px" }}>
          {step === 0 ? (
            <>
              {renderStep()}
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 20, display: "flex", justifyContent: "flex-end" }}>
                <button onClick={() => canNext() && setStep(1)} disabled={!canNext()} style={{ background: canNext() ? "#CC0000" : "rgba(255,255,255,0.1)", color: "#FFF", border: "none", borderRadius: 6, padding: "11px 28px", fontSize: 12, fontWeight: 700, fontFamily: "'Syne', sans-serif", cursor: canNext() ? "pointer" : "not-allowed", letterSpacing: "0.08em", textTransform: "uppercase", opacity: canNext() ? 1 : 0.4 }}>
                  Continuar →
                </button>
              </div>
              <div style={{ textAlign: "center", marginTop: 20, fontSize: 10, color: "rgba(255,255,255,0.2)", letterSpacing: "0.06em", textTransform: "uppercase", paddingBottom: 32 }}>
                terramatch · NIT 901.612.770-8 · Bogotá, Colombia · Confidencial
              </div>
            </>
          ) : (
            <>
              <div style={{ background: "#FFF", borderRadius: 16, padding: 28, boxShadow: "0 4px 32px rgba(0,0,0,0.06)", border: "1px solid #E8E8E8" }}>
                {renderStep()}
                {step < 6 && (
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 24, paddingTop: 20, borderTop: "1px solid #F0F0F0" }}>
                    <button onClick={() => setStep(s => Math.max(0, s - 1))} style={{ padding: "10px 20px", background: "#F0F0F0", color: "#555", border: "none", borderRadius: 8, fontSize: 13, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
                      ← Anterior
                    </button>
                    <div style={{ fontSize: 12, color: "#BBB" }}>Paso {step} de {STEPS.length - 1}</div>
                    <button onClick={() => canNext() && setStep(s => s + 1)} disabled={!canNext()} style={{ padding: "11px 28px", background: canNext() ? "linear-gradient(135deg, #CC0000, #990000)" : "#E0E0E0", color: canNext() ? "#FFF" : "#AAA", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: canNext() ? "pointer" : "not-allowed", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.05em" }}>
                      {step === 5 ? "Ver Resumen →" : "Continuar →"}
                    </button>
                  </div>
                )}
              </div>
              <div style={{ textAlign: "center", marginTop: 20, fontSize: 11, color: "#BBB" }}>
                terramatch · NIT 901.612.770-8 · Bogotá, Colombia · Documento confidencial
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
