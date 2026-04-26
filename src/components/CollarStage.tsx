'use client';

import { useWindowWidth } from '@/hooks/useWindowWidth';
import { Collar, ALL_CHARMS } from '@/lib/data';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useEffect, useState } from 'react';

interface CollarStageProps {
  collar: Collar;
  selectedCharms: (string | null)[];
  isDark: boolean;
  moveCharm: (fromIndex: number, toIndex: number) => void;
  onClearSlot: (slotIndex: number) => void;
}

function SortableSlot({
  slotIndex,
  charmId,
  slotSize,
  charmSize,
  isMobile,
  onClear,
}: {
  slotIndex: number;
  charmId: string | null;
  slotSize: number;
  charmSize: number;
  isMobile: boolean;
  onClear: () => void;
}) {
  const charm = charmId ? ALL_CHARMS.find(c => c.id === charmId) : null;
  const id = `slot-${slotIndex}`;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled: !charm });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: charm ? 'none' : undefined,
  } as React.CSSProperties;

  // While this slot is the drag source, show it as empty so only the overlay floats
  const showFilled = charm && !isDragging;

  return (
    <div
      ref={setNodeRef}
      style={{
        ...style,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        cursor: showFilled ? 'grab' : 'default',
      }}
      {...(charm ? { ...attributes, ...listeners } : {})}
    >
      <div
        style={{
          width: slotSize,
          height: slotSize,
          flexShrink: 0,
          borderRadius: '50%',
          background: showFilled ? charm!.bg : 'rgba(61,53,48,0.06)',
          border: '2px dashed rgba(61,53,48,0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background-color 250ms ease-out',
          userSelect: 'none',
          WebkitUserSelect: 'none',
        }}
      >
        {showFilled ? (
          <img
            src={encodeURI(charm!.image)}
            alt=""
            aria-hidden="true"
            draggable={false}
            style={{ width: charmSize, height: charmSize, maxWidth: '120%', maxHeight: '120%', objectFit: 'contain' }}
          />
        ) : (
          <span style={{ fontSize: isMobile ? 14 : 18, color: 'rgba(61,53,48,0.2)' }}>+</span>
        )}
      </div>
      {showFilled && (
        <button
          onPointerDown={e => e.stopPropagation()}
          onClick={e => { e.stopPropagation(); onClear(); }}
          aria-label="Remove charm"
          style={{
            position: 'absolute',
            top: -4,
            right: -4,
            width: 18,
            height: 18,
            borderRadius: '50%',
            background: 'rgba(61,53,48,0.75)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'rgba(255,255,255,0.9)',
            fontSize: 10,
            lineHeight: 1,
            zIndex: 10,
            padding: 0,
          }}
        >
          ✕
        </button>
      )}
    </div>
  );
}

function DragPreview({ charmId, slotSize, charmSize, isMobile }: { charmId: string; slotSize: number; charmSize: number; isMobile: boolean }) {
  const charm = ALL_CHARMS.find(c => c.id === charmId);
  if (!charm) return null;
  return (
    <div
      style={{
        width: slotSize,
        height: slotSize,
        borderRadius: '50%',
        background: charm.bg,
        border: '2px dashed rgba(61,53,48,0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.9,
        transform: 'scale(1.1)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
        cursor: 'grabbing',
        userSelect: 'none',
      }}
    >
      <img
        src={encodeURI(charm.image)}
        alt=""
        draggable={false}
        style={{ width: charmSize, height: charmSize, maxWidth: '120%', maxHeight: '120%', objectFit: 'contain' }}
      />
    </div>
  );
}

export function CollarStage({ collar, selectedCharms, isDark, moveCharm, onClearSlot }: CollarStageProps) {
  const w = useWindowWidth() ?? 1200;
  const isMobile = w < 768;
  const slotSize = isMobile ? 48 : 68;
  const charmSize = isMobile ? 120 : 150;
  const [mounted, setMounted] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  useEffect(() => { setMounted(true); }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } }),
  );

  const slotIds = ['slot-0', 'slot-1', 'slot-2', 'slot-3', 'slot-4'];

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);
    if (!over || active.id === over.id) return;
    const fromIndex = slotIds.indexOf(active.id as string);
    const toIndex = slotIds.indexOf(over.id as string);
    if (fromIndex !== -1 && toIndex !== -1) {
      moveCharm(fromIndex, toIndex);
    }
  };

  const activeCharmId = activeId ? selectedCharms[slotIds.indexOf(activeId)] : null;

  return (
    <div
      style={{
        flex: 1,
        width: '100%',
        display: 'flex',
        alignItems: isMobile ? 'stretch' : 'center',
        justifyContent: 'center',
        minHeight: isMobile ? 'auto' : 'calc(100vh - 120px)',
      }}
    >
      <div
        style={{
          background: collar.color,
          borderRadius: isMobile ? 10 : 14,
          padding: isMobile ? '12px 20px' : '18px 34px',
          width: '100%',
          boxSizing: 'border-box',
          boxShadow: `0 0 25px ${collar.glowColor}80, 0 4px 10px ${collar.glowColor}80`,
          transition: 'background-color 400ms ease-out, box-shadow 400ms ease-out',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {mounted ? (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={slotIds} strategy={horizontalListSortingStrategy}>
              <div style={{ display: 'flex', gap: isMobile ? 8 : 14, alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                {slotIds.map((id, i) => (
                  <SortableSlot
                    key={id}
                    slotIndex={i}
                    charmId={selectedCharms[i]}
                    slotSize={slotSize}
                    charmSize={charmSize}
                    isMobile={isMobile}
                    onClear={() => onClearSlot(i)}
                  />
                ))}
              </div>
            </SortableContext>
            <DragOverlay>
              {activeId && activeCharmId ? (
                <DragPreview charmId={activeCharmId} slotSize={slotSize} charmSize={charmSize} isMobile={isMobile} />
              ) : null}
            </DragOverlay>
          </DndContext>
        ) : (
          <div style={{ display: 'flex', gap: isMobile ? 8 : 14, alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            {slotIds.map((_, i) => {
              const charm = selectedCharms[i] ? ALL_CHARMS.find(c => c.id === selectedCharms[i]) : null;
              return (
                <div key={i} style={{ width: slotSize, height: slotSize, flexShrink: 0, borderRadius: '50%', background: charm ? charm.bg : 'rgba(61,53,48,0.06)', border: '2px dashed rgba(61,53,48,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {charm ? <img src={encodeURI(charm.image)} alt="" style={{ width: charmSize, height: charmSize, maxWidth: '120%', maxHeight: '120%', objectFit: 'contain' }} /> : <span style={{ fontSize: isMobile ? 14 : 18, color: 'rgba(61,53,48,0.2)' }}>+</span>}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
