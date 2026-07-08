import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, Calendar, Mail, CheckSquare, Users, Target, Headphones, DollarSign, Plus } from 'lucide-react';
import Button from '@shared/components/ui/Button';
import Badge from '@shared/components/ui/Badge';
import Card from '@shared/components/ui/Card';
import StatsCard from '@shared/components/ui/StatsCard';
import Breadcrumb from '@shared/components/ui/Breadcrumb';
import { actividadesMock, oportunidadesMock } from '@modules/crm/data/mockData';

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('es-EC', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(value);

const actividadIconMap = {
  llamada: Phone,
  reunion: Calendar,
  correo: Mail,
  tarea: CheckSquare,
};

const actividadColorMap = {
  llamada: '#3B82F6',
  reunion: '#8B5CF6',
  correo: '#F59E0B',
  tarea: '#10B981',
};

const etapaBadgeVariant = (etapa: string) => {
  const map: Record<string, 'success' | 'warning' | 'info' | 'primary' | 'default'> = {
    nueva: 'default',
    calificada: 'info',
    propuesta: 'warning',
    negociacion: 'primary',
    cerrada_ganada: 'success',
    cerrada_perdida: 'error',
  };
  return map[etapa] ?? 'default';
};

const etapaLabelMap: Record<string, string> = {
  nueva: 'Nueva',
  calificada: 'Calificada',
  propuesta: 'Propuesta',
  negociacion: 'Negociación',
  cerrada_ganada: 'Cerrada (G)',
  cerrada_perdida: 'Cerrada (P)',
};

export default function CRMPage() {
  const navigate = useNavigate();

  const stats = [
    { title: 'Clientes', value: '24', icon: Users, color: '#3B82F6' },
    { title: 'Oportunidades Activas', value: '8', icon: Target, color: '#8B5CF6' },
    { title: 'Tickets Abiertos', value: '7', icon: Headphones, color: '#F59E0B' },
    { title: 'Valor Total', value: formatCurrency(126000), icon: DollarSign, color: '#10B981' },
  ];

  const sortedActividades = [...actividadesMock].sort(
    (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
  );

  const sortedOportunidades = [...oportunidadesMock].sort(
    (a, b) => new Date(b.fechaCierre).getTime() - new Date(a.fechaCierre).getTime()
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <Breadcrumb items={[{ label: 'Inicio', href: '/' }, { label: 'CRM' }]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#2D2D2D]">CRM</h1>
          <p className="text-sm text-[#6B7280] mt-1">Gestión de relaciones con clientes</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="primary" icon={Plus} onClick={() => navigate('/crm/oportunidades/nueva')}>
            Nueva Oportunidad
          </Button>
          <Button variant="outline" icon={Plus} onClick={() => navigate('/crm/tickets/nuevo')}>
            Nuevo Ticket
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
          >
            <StatsCard
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
            />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Últimas Actividades">
          <div className="space-y-3">
            {sortedActividades.slice(0, 5).map((act, i) => {
              const Icon = actividadIconMap[act.tipo];
              const color = actividadColorMap[act.tipo];
              return (
                <motion.div
                  key={act.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.3 }}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ backgroundColor: `${color}15` }}
                  >
                    <Icon className="h-4 w-4" style={{ color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#2D2D2D] truncate">{act.asunto}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-[#6B7280]">{act.cliente}</span>
                      <span className="text-xs text-[#6B7280]">·</span>
                      <span className="text-xs text-[#6B7280]">{act.fecha}</span>
                    </div>
                  </div>
                  <Badge variant={act.realizada ? 'success' : 'warning'} size="sm">
                    {act.realizada ? 'Hecha' : 'Pendiente'}
                  </Badge>
                </motion.div>
              );
            })}
          </div>
        </Card>

        <Card title="Oportunidades Recientes">
          <div className="space-y-2">
            {sortedOportunidades.slice(0, 5).map((op, i) => (
              <motion.div
                key={op.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08, duration: 0.3 }}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => navigate(`/crm/oportunidades/${op.id}`)}
              >
                <div className="flex-1 min-w-0 mr-3">
                  <p className="text-sm font-medium text-[#2D2D2D] truncate">{op.nombre}</p>
                  <p className="text-xs text-[#6B7280] mt-0.5">{op.cliente}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={etapaBadgeVariant(op.etapa)} size="sm">
                    {etapaLabelMap[op.etapa] ?? op.etapa}
                  </Badge>
                  <span className="text-sm font-semibold text-[#2D2D2D] whitespace-nowrap">
                    {formatCurrency(op.valor)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>
    </motion.div>
  );
}
