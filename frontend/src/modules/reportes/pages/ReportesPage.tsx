import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp, ShoppingCart, Package, Warehouse, DollarSign, Users, Headphones, Target,
  BarChart3, FileText, Download,
} from 'lucide-react';
import Button from '@shared/components/ui/Button';
import Card from '@shared/components/ui/Card';
import Modal from '@shared/components/ui/Modal';
import Breadcrumb from '@shared/components/ui/Breadcrumb';
import type { LucideIcon } from 'lucide-react';

interface ReportOption {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

const reportes: ReportOption[] = [
  { id: 'ventas', title: 'Ventas por Período', description: 'Reporte detallado de ventas agrupadas por rango de fechas.', icon: TrendingUp, color: '#3B82F6' },
  { id: 'compras', title: 'Compras por Proveedor', description: 'Resumen de compras realizadas agrupadas por proveedor.', icon: ShoppingCart, color: '#8B5CF6' },
  { id: 'productos', title: 'Productos Más Vendidos', description: 'Listado de productos con mayor volumen de ventas.', icon: Package, color: '#F59E0B' },
  { id: 'inventario', title: 'Inventario Actual', description: 'Estado actual del inventario con cantidades y ubicaciones.', icon: Warehouse, color: '#10B981' },
  { id: 'rentabilidad', title: 'Rentabilidad', description: 'Análisis de márgenes de rentabilidad por producto y período.', icon: DollarSign, color: '#EF4444' },
  { id: 'clientes', title: 'Clientes Frecuentes', description: 'Ranking de clientes con mayor frecuencia de compra.', icon: Users, color: '#EC4899' },
  { id: 'tickets', title: 'Tickets por Estado', description: 'Distribución de tickets de soporte según su estado actual.', icon: Headphones, color: '#14B8A6' },
  { id: 'oportunidades', title: 'Oportunidades por Etapa', description: 'Oportunidades de negocio agrupadas por etapa del pipeline.', icon: Target, color: '#F97316' },
];

const sampleChartData: Record<string, { label: string; value: number; color: string }[]> = {
  ventas: [
    { label: 'Ene', value: 12000, color: '#3B82F6' },
    { label: 'Feb', value: 18000, color: '#3B82F6' },
    { label: 'Mar', value: 15000, color: '#3B82F6' },
    { label: 'Abr', value: 22000, color: '#3B82F6' },
    { label: 'May', value: 28000, color: '#3B82F6' },
    { label: 'Jun', value: 25000, color: '#3B82F6' },
  ],
  compras: [
    { label: 'Prov A', value: 32000, color: '#8B5CF6' },
    { label: 'Prov B', value: 18000, color: '#8B5CF6' },
    { label: 'Prov C', value: 25000, color: '#8B5CF6' },
    { label: 'Prov D', value: 12000, color: '#8B5CF6' },
  ],
  productos: [
    { label: 'Prod 1', value: 450, color: '#F59E0B' },
    { label: 'Prod 2', value: 320, color: '#F59E0B' },
    { label: 'Prod 3', value: 280, color: '#F59E0B' },
    { label: 'Prod 4', value: 190, color: '#F59E0B' },
    { label: 'Prod 5', value: 150, color: '#F59E0B' },
  ],
  inventario: [
    { label: 'Categoría A', value: 1200, color: '#10B981' },
    { label: 'Categoría B', value: 850, color: '#10B981' },
    { label: 'Categoría C', value: 620, color: '#10B981' },
    { label: 'Categoría D', value: 430, color: '#10B981' },
  ],
  rentabilidad: [
    { label: 'Ene', value: 35, color: '#EF4444' },
    { label: 'Feb', value: 42, color: '#EF4444' },
    { label: 'Mar', value: 38, color: '#EF4444' },
    { label: 'Abr', value: 50, color: '#EF4444' },
    { label: 'May', value: 45, color: '#EF4444' },
    { label: 'Jun', value: 55, color: '#EF4444' },
  ],
  clientes: [
    { label: 'Cliente 1', value: 28, color: '#EC4899' },
    { label: 'Cliente 2', value: 22, color: '#EC4899' },
    { label: 'Cliente 3', value: 18, color: '#EC4899' },
    { label: 'Cliente 4', value: 15, color: '#EC4899' },
    { label: 'Cliente 5', value: 12, color: '#EC4899' },
  ],
  tickets: [
    { label: 'Abiertos', value: 7, color: '#14B8A6' },
    { label: 'Progreso', value: 4, color: '#14B8A6' },
    { label: 'Resueltos', value: 12, color: '#14B8A6' },
    { label: 'Cerrados', value: 8, color: '#14B8A6' },
  ],
  oportunidades: [
    { label: 'Nueva', value: 5, color: '#F97316' },
    { label: 'Calificada', value: 4, color: '#F97316' },
    { label: 'Propuesta', value: 3, color: '#F97316' },
    { label: 'Negociación', value: 2, color: '#F97316' },
    { label: 'Ganada', value: 6, color: '#F97316' },
    { label: 'Perdida', value: 2, color: '#F97316' },
  ],
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('es-EC', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(value);

const formatValue = (value: number, reportId: string) => {
  if (['ventas', 'compras', 'inventario'].includes(reportId)) return formatCurrency(value);
  if (['rentabilidad'].includes(reportId)) return `${value}%`;
  return String(value);
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function ReportesPage() {
  const [selectedReport, setSelectedReport] = useState<ReportOption | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGenerar = (report: ReportOption) => {
    setSelectedReport(report);
    setIsModalOpen(true);
  };

  const chartData = selectedReport ? sampleChartData[selectedReport.id] ?? [] : [];
  const maxValue = Math.max(...chartData.map((d) => d.value), 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <Breadcrumb items={[{ label: 'Inicio', href: '/' }, { label: 'Reportes' }]} />

      <div>
        <h1 className="text-2xl font-bold text-[#2D2D2D]">Reportes</h1>
        <p className="text-sm text-[#6B7280] mt-1">Genera reportes e informes del sistema</p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {reportes.map((report) => (
          <motion.div key={report.id} variants={cardVariants}>
            <Card className="h-full">
              <div className="flex flex-col h-full">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: `${report.color}15` }}
                >
                  <report.icon className="h-6 w-6" style={{ color: report.color }} />
                </div>
                <h3 className="text-base font-semibold text-[#2D2D2D]">{report.title}</h3>
                <p className="text-sm text-[#6B7280] mt-1 flex-1">{report.description}</p>
                <div className="mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={FileText}
                    onClick={() => handleGenerar(report)}
                    className="w-full"
                  >
                    Generar
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedReport?.title ?? 'Reporte'}
        size="lg"
        footer={
          <Button variant="primary" onClick={() => setIsModalOpen(false)}>
            Cerrar
          </Button>
        }
      >
        {selectedReport && (
          <div className="space-y-6">
            <p className="text-sm text-[#6B7280]">{selectedReport.description}</p>

            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="h-5 w-5 text-[#6B7280]" />
                <span className="text-sm font-medium text-[#2D2D2D]">Datos de muestra</span>
              </div>

              <div className="space-y-3">
                {chartData.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: '100%' }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="flex items-center gap-3"
                  >
                    <span className="text-xs text-[#6B7280] w-20 text-right flex-shrink-0">
                      {item.label}
                    </span>
                    <div className="flex-1 h-6 bg-gray-200 rounded-md overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(item.value / maxValue) * 100}%` }}
                        transition={{ delay: i * 0.1 + 0.2, duration: 0.6, ease: 'easeOut' }}
                        className="h-full rounded-md"
                        style={{ backgroundColor: item.color }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-[#2D2D2D] w-24 flex-shrink-0">
                      {formatValue(item.value, selectedReport.id)}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center p-4 border-2 border-dashed border-gray-200 rounded-xl">
              <div className="text-center">
                <Download className="h-6 w-6 text-[#6B7280] mx-auto mb-1" />
                <p className="text-sm text-[#6B7280]">Exportar reporte completo</p>
                <p className="text-xs text-[#9CA3AF] mt-0.5">PDF · Excel · CSV</p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </motion.div>
  );
}
