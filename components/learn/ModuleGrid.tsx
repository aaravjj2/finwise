'use client';

import { ModuleCard } from '@/components/learn/ModuleCard';
import type { LearningModule } from '@/types';

interface ModuleGridProps {
  modules: LearningModule[];
  completedModules: string[];
}

export function ModuleGrid({ modules, completedModules }: ModuleGridProps): JSX.Element {
  function isModuleUnlocked(module: LearningModule): boolean {
    if (module.prerequisites.length === 0) return true;
    return module.prerequisites.every((prereq) => completedModules.includes(prereq));
  }

  function isModuleCompleted(module: LearningModule): boolean {
    return completedModules.includes(module.slug);
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {modules.map((module) => (
        <ModuleCard
          key={module.id}
          module={module}
          isUnlocked={isModuleUnlocked(module)}
          isCompleted={isModuleCompleted(module)}
          prerequisiteNames={module.prerequisites}
        />
      ))}
    </div>
  );
}
