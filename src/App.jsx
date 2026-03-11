import { useState } from "react";

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwqRYuPU5wldokSFClKauyyaOD1_aPw3uOARM12jP_c7e08RWTfgHWalOQByfgcY_o1/exec";

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
  modo: "",
  nombre: "", identificacion: "", matricula: "", direccion: "",
  contacto: "", email: "", telefono: "", ciudad: "",
  cantidadLocales: "", actividadNegocio: "",
  ciudadBusqueda: "", barrioZona: "", zonasAceptables: "", zonasNoAceptadas: "",
  permisoConstructura: "", accesosRequeridos: [],
  tipoNegocio: "", usoSuelo: [], areaTotalMin: "", areaTotalMax: "",
  alturaLibre: "", parqueaderos: "",
  caracteristicas: [], instalaciones: [],
  presupuestoCompra: "", canonMaximo: "", adminMaxima: "", financiacion: "",
  precioVenta: "", canonArriendo: "", adminMensual: "",
  plazoContrato: [], documentos: [],
  plazoDecision: "", fechaCierre: "", acelerador: "", bloqueador: "",
  gestionParalela: "",
  observaciones: "",
};

const CheckGroup = ({ label, options, value = [], onChange, color = "#CC0000" }) => (
  <div style={{ marginBottom: 16 }}>
    <div style={{ fontSize: 11, fontWeight: 700, color: "#1A1A2E", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>
      {label}
    </div>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {options.map(opt => {
        const active = value.includes(opt);
        return (
          <button
            key={opt}
            onClick={() => onChange(active ? value.filter(v => v !== opt) : [...value, opt])}
            style={{
              padding: "7px 14px", borderRadius: 6,
              border: `2px solid ${active ? color : "#DDD"}`,
              background: active ? color : "#FAFAFA",
              color: active ? "#FFF" : "#3D3D3D",
              fontSize: 12, fontFamily: "'DM Sans', sans-serif",
              fontWeight: active ? 700 : 400, cursor: "pointer",
              transition: "all 0.15s ease", display: "flex", alignItems: "center", gap: 6,
            }}
          >
            <span style={{ fontSize: 10 }}>{active ? "✓" : "○"}</span>
            {opt}
          </button>
        );
      })}
    </div>
  </div>
);

const RadioGroup = ({ label, options, value, onChange, color = "#CC0000", highlight = false }) => (
  <div style={{ marginBottom: 16, ...(highlight ? { background: "#FFF8E7", border: "2px solid #E8A020", borderRadius: 10, padding: 14 } : {}) }}>
    <div style={{ fontSize: 11, fontWeight: 700, color: highlight ? "#6B4800" : "#1A1A2E", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>
      {label}
    </div>
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
      {options.map(opt => {
        const active = value === opt;
        return (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            style={{
              padding: "7px 14px", borderRadius: 6,
              border: `2px solid ${active ? color : "#DDD"}`,
              background: active ? color : "#FAFAFA",
              color: active ? "#FFF" : "#3D3D3D",
              fontSize: 12, fontFamily: "'DM Sans', sans-serif",
              fontWeight: active ? 700 : 400, cursor: "pointer",
              transition: "all 0.15s ease", display: "flex", alignItems: "center", gap: 6,
            }}
          >
            <span style={{ fontSize: 10 }}>{active ? "✓" : "○"}</span>
            {opt}
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
    <input
      type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
      style={{
        width: "100%", padding: "10px 14px", border: "none",
        borderBottom: "2px solid #CC0000", background: "#F9F9F9",
        borderRadius: "6px 6px 0 0", fontSize: 13,
        fontFamily: "'DM Sans', sans-serif", color: "#1A1A2E",
        outline: "none", boxSizing: "border-box", transition: "border-color 0.2s",
      }}
      onFocus={e => e.target.style.borderBottomColor = "#1A1A2E"}
      onBlur={e => e.target.style.borderBottomColor = "#CC0000"}
    />
  </div>
);

const TextArea = ({ label, value, onChange, placeholder = "" }) => (
  <div style={{ marginBottom: 16 }}>
    <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#1A1A2E", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>
      {label}
    </label>
    <textarea
      value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={3}
      style={{
        width: "100%", padding: "10px 14px", border: "none",
        borderBottom: "2px solid #CC0000", background: "#F9F9F9",
        borderRadius: "6px 6px 0 0", fontSize: 13,
        fontFamily: "'DM Sans', sans-serif", color: "#1A1A2E",
        outline: "none", resize: "vertical", boxSizing: "border-box",
      }}
    />
  </div>
);

const TwoCol = ({ children }) => (
  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>{children}</div>
);

const SectionTitle = ({ icon, title, subtitle, color = "#1A1A2E" }) => (
  <div style={{ marginBottom: 24 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
      <span style={{ fontSize: 20 }}>{icon}</span>
      <h2 style={{ margin: 0, fontSize: 16, fontWeight: 800, color, fontFamily: "'DM Serif Display', serif", letterSpacing: "-0.01em" }}>{title}</h2>
    </div>
    {subtitle && <p style={{ margin: "4px 0 0 30px", fontSize: 12, color: "#888", fontStyle: "italic" }}>{subtitle}</p>}
    <div style={{ height: 2, background: `linear-gradient(to right, ${color}, transparent)`, marginTop: 10, borderRadius: 2 }} />
  </div>
);

const KeySection = ({ children }) => (
  <div style={{ background: "linear-gradient(135deg, #FFF8E7 0%, #FFF3CD 100%)", border: "2px solid #E8A020", borderRadius: 12, padding: 20, marginBottom: 8 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
      <span style={{ fontSize: 18 }}>⚑</span>
      <h2 style={{ margin: 0, fontSize: 15, fontWeight: 800, color: "#6B4800", fontFamily: "'DM Serif Display', serif" }}>HORIZONTE DE DECISIÓN — CAMPO CLAVE</h2>
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

  const enviar = async () => {
    setEnviando(true);
    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setEnviado(true);
    } catch (err) {
      alert("❌ Error al enviar. Verifica tu conexión e intenta de nuevo.");
    }
    setEnviando(false);
  };

  const rows = [
    ["Modo", data.modo],
    ["Nombre", data.nombre],
    ["Identificación", data.identificacion],
    ["Email", data.email],
    ["Teléfono", data.telefono],
    ["Ciudad", data.ciudad || data.ciudadBusqueda],
    ...(data.modo === "Busco Locales" ? [
      ["Cantidad de locales", data.cantidadLocales],
      ["Actividad / Uso", data.actividadNegocio],
    ] : []),
    ["Barrio / Zona", data.barrioZona],
    ["Tipo de negocio", data.tipoNegocio],
    ["Uso del suelo", (data.usoSuelo || []).join(", ")],
    ["Área mín. (m²)", data.areaTotalMin],
    ["Área máx. (m²)", data.areaTotalMax],
    ["Características", (data.caracteristicas || []).join(", ")],
    ["Plazo del contrato", (data.plazoContrato || []).join(", ")],
    ...(data.modo === "Busco Locales" ? [
      ["Presupuesto máx. compra", data.presupuestoCompra],
      ["Canon máximo", data.canonMaximo],
    ] : [
      ["Precio de venta", data.precioVenta],
      ["Canon de arriendo", data.canonArriendo],
    ]),
    ["⚑ Plazo de decisión", data.plazoDecision],
    ["⚑ Fecha estimada de cierre", data.fechaCierre],
    ["⚑ Acelerador", data.acelerador],
    ["⚑ Bloqueador", data.bloqueador],
    ["Observaciones", data.observaciones],
  ].filter(([, v]) => v && String(v).trim());

  if (enviado) {
    return (
      <div style={{ textAlign: "center", padding: "40px 20px" }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>✅</div>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1A1A2E", fontFamily: "'DM Serif Display', serif", marginBottom: 8 }}>
          IUB enviado correctamente
        </h2>
        <p style={{ color: "#666", fontSize: 14, marginBottom: 8 }}>
          Los datos llegaron a Google Sheets y recibirás un correo de confirmación.
        </p>
        <p style={{ color: "#888", fontSize: 12, marginBottom: 32 }}>
          Revisa tu bandeja de entrada en Gmail.
        </p>
        <button
          onClick={onReset}
          style={{
            padding: "12px 32px", background: "linear-gradient(135deg, #CC0000, #990000)",
            color: "#FFF", border: "none", borderRadius: 8, fontSize: 14,
            fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
          }}
        >
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
          <div key={k} style={{
            display: "grid", gridTemplateColumns: "200px 1fr",
            padding: "10px 16px",
            background: i % 2 === 0 ? "#FFF" : "#F9F9F9",
            borderBottom: "1px solid #F0F0F0", alignItems: "start"
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: k.startsWith("⚑") ? "#8B5E00" : "#888", textTransform: "uppercase", letterSpacing: "0.06em", paddingRight: 8 }}>{k}</div>
            <div style={{ fontSize: 13, color: "#1A1A2E" }}>{v}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 12 }}>
        <button
          onClick={enviar}
          disabled={enviando}
          style={{
            flex: 1, padding: "14px 0",
            background: enviando ? "#AAA" : "linear-gradient(135deg, #CC0000, #990000)",
            color: "#FFF", border: "none", borderRadius: 8, fontSize: 14,
            fontWeight: 700, cursor: enviando ? "not-allowed" : "pointer",
            fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.05em",
          }}
        >
          {enviando ? "Enviando..." : "ENVIAR IUB ✓"}
        </button>
        <button
          onClick={onReset}
          style={{
            padding: "14px 20px", background: "#F0F0F0",
            color: "#555", border: "none", borderRadius: 8, fontSize: 13,
            cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
          }}
        >
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

  const canNext = () => {
    if (step === 0) return !!data.modo;
    if (step === 1) return !!data.nombre && !!data.email;
    return true;
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <p style={{ color: "#666", fontSize: 14, margin: 0 }}>¿Cuál es tu rol en esta búsqueda?</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {["Tengo Locales", "Busco Locales"].map(opt => {
                const active = data.modo === opt;
                const icon = opt === "Tengo Locales" ? "🏪" : "🔍";
                const desc = opt === "Tengo Locales"
                  ? "Soy propietario o inmobiliaria y quiero publicar un inmueble"
                  : "Soy empresario o persona y necesito encontrar un local";
                return (
                  <button key={opt} onClick={() => set("modo")(opt)} style={{
                    padding: 24, borderRadius: 12,
                    border: `3px solid ${active ? "#CC0000" : "#E0E0E0"}`,
                    background: active ? "#FFF5F5" : "#FAFAFA",
                    cursor: "pointer", textAlign: "left", transition: "all 0.2s ease",
                    boxShadow: active ? "0 4px 20px rgba(204,0,0,0.12)" : "none",
                  }}>
                    <div style={{ fontSize: 32, marginBottom: 10 }}>{icon}</div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: active ? "#CC0000" : "#1A1A2E", fontFamily: "'DM Serif Display', serif", marginBottom: 8 }}>{opt}</div>
                    <div style={{ fontSize: 12, color: "#777", lineHeight: 1.4 }}>{desc}</div>
                    {active && <div style={{ marginTop: 10, fontSize: 11, color: "#CC0000", fontWeight: 700 }}>✓ SELECCIONADO</div>}
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
              <CheckGroup label="Accesos requeridos" value={data.accesosRequeridos} onChange={set("accesosRequeridos")} color="#CC0000"
                options={["Vía principal", "Doble calzada", "Centro Comercial", "Isla", "Plazoleta de comidas", "Parking propio"]} />
            </> : <>
              <Field label="Dirección del Inmueble" value={data.zonasAceptables} onChange={set("zonasAceptables")} />
              <RadioGroup label="Permiso de Construcción" value={data.permisoConstructura} onChange={set("permisoConstructura")} color="#CC0000"
                options={["Sí cuenta", "No cuenta", "En trámite"]} />
            </>}
          </div>
        );
      case 3:
        return (
          <div>
            <SectionTitle icon="🏢" title="CARACTERÍSTICAS DEL INMUEBLE" color="#2C3E6B" />
            <RadioGroup label="Tipo de Negocio" value={data.tipoNegocio} onChange={set("tipoNegocio")} color="#2C3E6B"
              options={["Arriendo", "Venta", "Leasing comercial"]} />
            <CheckGroup label="Uso del Suelo" value={data.usoSuelo} onChange={set("usoSuelo")} color="#2C3E6B"
              options={["Mixto", "Comercial", "Industrial", "Residencial"]} />
            <TwoCol>
              <Field label={isBusco ? "Área mínima (m²)" : "Área Total (m²)"} value={data.areaTotalMin} onChange={set("areaTotalMin")} type="number" />
              <Field label={isBusco ? "Área máxima (m²)" : "Área Construida (m²)"} value={data.areaTotalMax} onChange={set("areaTotalMax")} type="number" />
            </TwoCol>
            <TwoCol>
              <Field label="Altura Libre Mínima (m)" value={data.alturaLibre} onChange={set("alturaLibre")} />
              <Field label="Parqueaderos mínimos" value={data.parqueaderos} onChange={set("parqueaderos")} />
            </TwoCol>
            <CheckGroup label="Características Especiales" value={data.caracteristicas} onChange={set("caracteristicas")} color="#2C3E6B"
              options={["Esquinero", "Vía Principal", "Vía Secundaria", "Doble Altura", "Mezzanine", "Terraza / Patio", "Sótano", "Doble Frente"]} />
            {isBusco && <CheckGroup label="Instalaciones Requeridas" value={data.instalaciones} onChange={set("instalaciones")} color="#2C3E6B"
              options={["Extracción", "Cocina industrial", "Refrigeración", "Carga eléctrica reforzada", "Gas natural"]} />}
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
              <RadioGroup label="Financiación" value={data.financiacion} onChange={set("financiacion")} color="#4A4A6A"
                options={["Ya aprobada", "En trámite", "No requiere"]} />
            </> : <>
              <TwoCol>
                <Field label="Precio de Venta ($) / Precio m²" value={data.precioVenta} onChange={set("precioVenta")} placeholder="$ 0" />
                <Field label="Canon de Arriendo mensual ($)" value={data.canonArriendo} onChange={set("canonArriendo")} placeholder="$ 0" />
              </TwoCol>
              <Field label="Administración mensual ($)" value={data.adminMensual} onChange={set("adminMensual")} placeholder="$ 0" />
              <CheckGroup label="Documentos Disponibles" value={data.documentos} onChange={set("documentos")} color="#4A4A6A"
                options={["Fotos", "PDF planos", "JPG", "DWG / CAD", "Escritura"]} />
            </>}
            <CheckGroup label="Plazo del Contrato (años)" value={data.plazoContrato} onChange={set("plazoContrato")} color="#4A4A6A"
              options={["3 años", "5 años", "10 años", "Más de 10", "Negociación abierta"]} />
          </div>
        );
      case 5:
        return (
          <div>
            <KeySection>
              <RadioGroup label="Plazo para tomar la decisión" value={data.plazoDecision} onChange={set("plazoDecision")} color="#E8A020"
                options={["Inmediato (0–1 mes)", "Corto (1–3 meses)", "Mediano (3–6 meses)", "Largo (+6 meses)"]} highlight />
              <Field label="Fecha estimada de cierre del negocio" value={data.fechaCierre} onChange={set("fechaCierre")} type="date" />
              <Field label="¿Qué condición aceleraría la decisión?" value={data.acelerador} onChange={set("acelerador")} placeholder="Ej: encontrar el área exacta, precio dentro del presupuesto…" />
              <Field label="¿Qué podría retrasar o cancelar la búsqueda?" value={data.bloqueador} onChange={set("bloqueador")} placeholder="Ej: situación financiera pendiente, expansión condicionada…" />
              {isBusco && <RadioGroup label="¿Revisa otras opciones en paralelo?" value={data.gestionParalela} onChange={set("gestionParalela")} color="#E8A020"
                options={["No, gestión exclusiva Terramatch", "Sí, con otros gestores", "Sí, directamente con propietarios"]} highlight />}
            </KeySection>
            <TextArea label="Observaciones Adicionales" value={data.observaciones} onChange={set("observaciones")} placeholder="Cualquier detalle importante no contemplado en el formulario…" />
          </div>
        );
      case 6:
        return <Resumen data={data} onReset={() => { setData(initialData); setStep(0); }} />;
      default:
        return null;
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=DM+Serif+Display&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #F4F4F6; }
        input:focus, textarea:focus { outline: none; }
        button:focus { outline: none; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #F0F0F0; }
        ::-webkit-scrollbar-thumb { background: #CCC; border-radius: 2px; }
      `}</style>
      <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #F0F0F4 0%, #E8E8EE 100%)", fontFamily: "'DM Sans', sans-serif", padding: "0 0 40px" }}>
        <div style={{ background: "#1A1A2E", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 52 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 18, fontWeight: 800, color: "#CC0000", fontFamily: "'DM Serif Display', serif", letterSpacing: "-0.02em" }}>terramatch</span>
            <span style={{ width: 1, height: 20, background: "#333" }} />
            <span style={{ fontSize: 11, color: "#888", letterSpacing: "0.12em", textTransform: "uppercase" }}>IUB — Indicador Único de Búsqueda</span>
          </div>
          {data.modo && <div style={{ fontSize: 11, color: "#CC0000", fontWeight: 700, letterSpacing: "0.1em" }}>
            {data.modo === "Busco Locales" ? "🔍" : "🏪"} {data.modo.toUpperCase()}
          </div>}
        </div>
        {step > 0 && (
          <div style={{ background: "#FFF", borderBottom: "1px solid #E8E8E8", padding: "0 24px" }}>
            <div style={{ display: "flex", maxWidth: 720, margin: "0 auto" }}>
              {STEPS.slice(1).map((s, i) => {
                const idx = i + 1; const done = step > idx; const active = step === idx;
                return (
                  <div key={s.id} onClick={() => done && setStep(idx)}
                    style={{ flex: 1, padding: "10px 4px", textAlign: "center", cursor: done ? "pointer" : "default", position: "relative" }}>
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
        <div style={{ maxWidth: 720, margin: "32px auto 0", padding: "0 16px" }}>
          {step === 0 && (
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <div style={{ fontSize: 32, fontWeight: 800, color: "#1A1A2E", fontFamily: "'DM Serif Display', serif", letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 10 }}>
                Indicador Único<br />de Búsqueda
              </div>
              <p style={{ color: "#888", fontSize: 14, lineHeight: 1.6 }}>
                Estandariza los requerimientos de búsqueda inmobiliaria.<br />Sin falsas expectativas — gestión fluida para todas las partes.
              </p>
            </div>
          )}
          <div style={{ background: "#FFF", borderRadius: 16, padding: 28, boxShadow: "0 4px 32px rgba(0,0,0,0.06)", border: "1px solid #E8E8E8" }}>
            {renderStep()}
            {step < 6 && (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 24, paddingTop: 20, borderTop: "1px solid #F0F0F0" }}>
                <button onClick={() => setStep(s => Math.max(0, s - 1))} style={{ padding: "10px 20px", background: step === 0 ? "transparent" : "#F0F0F0", color: "#555", border: "none", borderRadius: 8, fontSize: 13, cursor: step === 0 ? "default" : "pointer", fontFamily: "'DM Sans', sans-serif", opacity: step === 0 ? 0 : 1 }}>
                  ← Anterior
                </button>
                <div style={{ fontSize: 12, color: "#BBB" }}>{step > 0 ? `Paso ${step} de ${STEPS.length - 1}` : ""}</div>
                <button onClick={() => canNext() && setStep(s => s + 1)} disabled={!canNext()} style={{ padding: "11px 28px", background: canNext() ? "linear-gradient(135deg, #CC0000, #990000)" : "#E0E0E0", color: canNext() ? "#FFF" : "#AAA", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: canNext() ? "pointer" : "not-allowed", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.05em", transition: "all 0.2s" }}>
                  {step === 5 ? "Ver Resumen →" : "Continuar →"}
                </button>
              </div>
            )}
          </div>
          <div style={{ textAlign: "center", marginTop: 20, fontSize: 11, color: "#BBB" }}>
            terramatch · NIT 901.612.770-8 · Bogotá, Colombia · Documento confidencial
          </div>
        </div>
      </div>
    </>
  );
}
