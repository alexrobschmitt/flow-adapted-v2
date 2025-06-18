"use client";

import React from "react";
import { Check, ChevronDown, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCognitiveProfile } from "@/hooks/use-cognitive-profile";
import { useCognitiveTheme } from "@/components/cognitive-theme-provider";
import { COGNITIVE_PROFILES } from "@/config/cognitive-profiles";
import type { CognitiveProfile } from "@/types/cognitive";
import { cn } from "@/lib/utils";

interface CognitiveProfileSelectorProps {
  className?: string;
  variant?: "default" | "compact" | "icon-only";
}

export function CognitiveProfileSelector({ 
  className, 
  variant = "default" 
}: CognitiveProfileSelectorProps) {
  const {
    profile,
    profileConfig,
    icon,
    color
  } = useCognitiveProfile();
  
  const { setProfile } = useCognitiveTheme();

  const handleProfileChange = (newProfile: CognitiveProfile) => {
    setProfile(newProfile);
  };



  const Icon = icon;

  if (variant === "icon-only") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "w-9 h-9 p-0 rounded-full",
              className
            )}
          >
            <div 
              className="w-6 h-6 rounded-full flex items-center justify-center"
              style={{ 
                backgroundColor: `${color}20`,
                color: color 
              }}
            >
              <Icon className="w-4 h-4" />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          <ProfileDropdownContent
            profile={profile}
            config={profileConfig}
            onProfileChange={handleProfileChange}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  if (variant === "compact") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "h-8 gap-2 text-xs",
              className
            )}
          >
            <div 
              className="w-4 h-4 rounded-full flex items-center justify-center"
              style={{ 
                backgroundColor: `${color}20`,
                color: color 
              }}
            >
              <Icon className="w-3 h-3" />
            </div>
            <span className="hidden sm:inline">{profileConfig.name}</span>
            <ChevronDown className="w-3 h-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          <ProfileDropdownContent
            profile={profile}
            config={profileConfig}
            onProfileChange={handleProfileChange}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  // Variant default
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "h-10 gap-3 justify-between min-w-[200px]",
            className
          )}
        >
          <div className="flex items-center gap-2">
            <div 
              className="w-5 h-5 rounded-full flex items-center justify-center"
              style={{ 
                backgroundColor: `${color}20`,
                color: color 
              }}
            >
              <Icon className="w-4 h-4" />
            </div>
            <span className="font-medium">{profileConfig.name}</span>
          </div>
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <ProfileDropdownContent
          profile={profile}
          config={profileConfig}
          onProfileChange={handleProfileChange}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface ProfileDropdownContentProps {
  profile: CognitiveProfile;
  config: any;
  onProfileChange: (profile: CognitiveProfile) => void;
}

function ProfileDropdownContent({
  profile,
  config,
  onProfileChange,
}: ProfileDropdownContentProps) {
  return (
    <>
      <DropdownMenuLabel className="flex items-center gap-2">
        <Settings className="w-4 h-4" />
        Perfil Cognitivo
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      
      {Object.values(COGNITIVE_PROFILES).map((profileConfig) => {
        const ProfileIcon = profileConfig.icon;
        const isSelected = profile === profileConfig.id;
        
        return (
          <DropdownMenuItem
            key={profileConfig.id}
            onClick={() => onProfileChange(profileConfig.id)}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div 
              className="w-5 h-5 rounded-full flex items-center justify-center"
              style={{ 
                backgroundColor: `${profileConfig.color}20`,
                color: profileConfig.color 
              }}
            >
              <ProfileIcon className="w-4 h-4" />
            </div>
            
            <div className="flex-1">
              <div className="font-medium">{profileConfig.name}</div>
              <div className="text-xs text-muted-foreground">
                {profileConfig.description}
              </div>
            </div>
            
            {isSelected && (
              <Check className="w-4 h-4 text-primary" />
            )}
          </DropdownMenuItem>
        );
      })}
      

    </>
  );
}
