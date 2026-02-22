"use client";
import { useState, useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

interface TimeSlot {
  day: string;
  time: string;
  available: boolean;
}

interface ClassCalendarProps {
  /** slot: texto para mostrar; slotIso: fecha/hora en ISO (UTC) para el API */
  onSlotSelect?: (slot: string, slotIso?: string) => void;
}

/** Fecha a medianoche local para comparaciones */
function toMidnight(d: Date): Date {
  const out = new Date(d);
  out.setHours(0, 0, 0, 0);
  return out;
}

export const ClassCalendar = ({ onSlotSelect }: ClassCalendarProps) => {
  const { t } = useLanguage();
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [weekOffset, setWeekOffset] = useState(0); // 0 = primeros 7 días, 1 = siguientes 7 días (desde mañana, máx 14)
  const [selectedSlotInfo, setSelectedSlotInfo] = useState<{day: string, date: string, time: string} | null>(null);

  const { minDate, maxDate, getWeek } = useMemo(() => {
    const today = toMidnight(new Date());
    const minDate = new Date(today);
    minDate.setDate(today.getDate() + 1); // mañana
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 14); // hoy + 14 días

    const getWeek = (offset: number): Date[] => {
      const week: Date[] = [];
      for (let i = 0; i < 7; i++) {
        const date = new Date(minDate);
        date.setDate(minDate.getDate() + offset * 7 + i);
        week.push(date);
      }
      return week;
    };
    return { minDate, maxDate, getWeek };
  }, []);

  const isDateInRange = (date: Date): boolean => {
    const d = toMidnight(date);
    return d >= minDate && d <= maxDate;
  };

  const currentWeek = getWeek(weekOffset);
  const canGoNext = weekOffset < 1;

  const dayNames = [
    t("callToAction.lunes"),
    t("callToAction.martes"),
    t("callToAction.miercoles"),
    t("callToAction.jueves"),
    t("callToAction.viernes"),
    t("callToAction.sabado"),
    t("callToAction.domingo"),
  ];

  const monthKeys = [
    "january", "february", "march", "april", "may", "june",
    "july", "august", "september", "october", "november", "december",
  ];
  const getMonthName = (monthIndex: number) => t(`callToAction.months.${monthKeys[monthIndex]}`);

  const getMonthYear = () => {
    const firstDay = currentWeek[0];
    return `${getMonthName(firstDay.getMonth())} ${firstDay.getFullYear()}`;
  };

  // Generar horarios disponibles
  const getAvailableSlots = (dayIndex: number, week: Date[]): TimeSlot[] => {
    const day = week[dayIndex];
    if (!isDateInRange(day)) return [];
    const dayOfWeek = day.getDay(); // 0 = Domingo, 6 = Sábado
    const slots: TimeSlot[] = [];

    // Fines de semana (Sábado = 6, Domingo = 0): toda la mañana
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      for (let hour = 9; hour <= 13; hour++) {
        slots.push({
          day: `${dayIndex}`,
          time: `${hour}:00`,
          available: true,
        });
      }
    }
    // Lunes, Martes, Jueves, Viernes (1, 2, 4, 5): tardes 3-8 PM
    else if ([1, 2, 4, 5].includes(dayOfWeek)) {
      for (let hour = 15; hour <= 20; hour++) {
        slots.push({
          day: `${dayIndex}`,
          time: `${hour}:00`,
          available: true,
        });
      }
    }

    return slots;
  };

  const handleSlotClick = (dayIndex: number, time: string, dayName: string, date: Date) => {
    const slotKey = `${weekOffset}-${dayIndex}-${time}`;
    const newSlot = selectedSlot === slotKey ? null : slotKey;
    setSelectedSlot(newSlot);

    if (newSlot) {
      const dateStr = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      const [h = "0", m = "0"] = time.split(":");
      const slotDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        parseInt(h, 10),
        parseInt(m, 10),
        0,
        0
      );
      const slotIso = slotDate.toISOString();
      setSelectedSlotInfo({ day: dayName, date: dateStr, time });
      if (onSlotSelect) {
        onSlotSelect(`${dayName} ${dateStr} - ${time}`, slotIso);
      }
    } else {
      setSelectedSlotInfo(null);
      if (onSlotSelect) {
        onSlotSelect("", undefined);
      }
    }
  };

  const handlePrevWeek = () => {
    if (weekOffset > 0) {
      setWeekOffset(weekOffset - 1);
      setSelectedSlot(null);
      setSelectedSlotInfo(null);
    }
  };

  const handleNextWeek = () => {
    if (canGoNext) {
      setWeekOffset(weekOffset + 1);
      setSelectedSlot(null);
      setSelectedSlotInfo(null);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-4 font-medium">{t("callToAction.seleccionaHorario")}</p>
      </div>

      {/* Navegación de semanas */}
      <div className="flex items-center justify-between mb-6">
        <motion.button
          onClick={handlePrevWeek}
          disabled={weekOffset === 0}
          whileHover={{ scale: weekOffset > 0 ? 1.1 : 1 }}
          whileTap={{ scale: weekOffset > 0 ? 0.9 : 1 }}
          className={`p-2 rounded-lg transition-all ${
            weekOffset === 0
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-blue-100 text-blue-700 hover:bg-blue-200"
          }`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </motion.button>

        <h3 className="text-lg font-bold text-gray-800">
          {getMonthYear()}
        </h3>

        <motion.button
          onClick={handleNextWeek}
          disabled={!canGoNext}
          whileHover={{ scale: canGoNext ? 1.1 : 1 }}
          whileTap={{ scale: canGoNext ? 0.9 : 1 }}
          className={`p-2 rounded-lg transition-all ${
            !canGoNext
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-blue-100 text-blue-700 hover:bg-blue-200"
          }`}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </motion.button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={weekOffset}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[500px] overflow-y-auto pr-2"
        >
          {currentWeek.map((date, dayIndex) => {
            const inRange = isDateInRange(date);
            const slots = getAvailableSlots(dayIndex, currentWeek);
            const dayOfWeek = date.getDay(); // 0=Dom, 1=Lun, ..., 6=Sab
            const dayName = dayNames[(dayOfWeek + 6) % 7]; // dayNames: 0=Lun .. 6=Dom

            return (
              <motion.div
                key={`${weekOffset}-${dayIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: dayIndex * 0.05 }}
                className={`rounded-lg shadow-md p-4 border ${
                  inRange
                    ? "bg-white border-gray-200"
                    : "bg-gray-100 border-gray-200 opacity-75"
                }`}
              >
                <h3 className={`font-bold text-lg mb-1 ${inRange ? "text-gray-800" : "text-gray-400"}`}>
                  {dayName}
                </h3>
                <p className={`text-sm mb-3 ${inRange ? "text-gray-500" : "text-gray-400"}`}>
                  {date.getDate()} {getMonthName(date.getMonth())}
                </p>
                <div className="flex flex-wrap gap-2">
                  {inRange && slots.map((slot, idx) => {
                    const slotKey = `${weekOffset}-${dayIndex}-${slot.time}`;
                    const isSelected = selectedSlot === slotKey;
                    return (
                      <motion.button
                        key={idx}
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSlotClick(dayIndex, slot.time, dayName, date)}
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                          isSelected
                            ? "bg-[#001738] text-white shadow-lg"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {slot.time}
                      </motion.button>
                    );
                  })}
                  {!inRange && <span className="text-sm text-gray-400">—</span>}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {selectedSlotInfo && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200"
        >
          <p className="text-sm text-blue-800 font-semibold">
            ✓ {t("callToAction.horarioSeleccionado")}: {selectedSlotInfo.day} {selectedSlotInfo.date} - {selectedSlotInfo.time}
          </p>
        </motion.div>
      )}
    </div>
  );
};

