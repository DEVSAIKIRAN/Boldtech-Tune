import { Home,  Search } from "lucide-react";
import React from "react"; // Import React for React.ReactNode

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator"; // Assuming Libary component exists in the same directory
import { Song } from "@/types"; // Assuming your Song type is defined
import Libary from "./Libary";

// Define the props interface for the AppSidebar component.
// Changed 'songs: Song' to 'songs: Song[]' as a library typically holds multiple songs.
interface AppSidebarProps {
  songs: Song[]; // Now expects an array of Song objects
}

// Menu items for the sidebar navigation.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Search",
    url: "/search",
    icon: Search,
  },
];


const AppSidebar: React.FC<AppSidebarProps> = ({
  songs
}) => {
  return (
    <Sidebar collapsible="icon" className="overflow-hidden">
      <SidebarContent>
        {/* Main navigation group */}
        <SidebarGroup>
          <SidebarHeader>
            <SidebarGroupLabel>boldtech Tune</SidebarGroupLabel>
          </SidebarHeader>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center space-x-2">
                      <item.icon className="h-5 w-5" /> {/* Add size to icons */}
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            <Separator  /> {/* Added class for visibility */}
            {/* This SidebarContent seems redundant here, it's empty */}
            {/* <SidebarContent>
                
            </SidebarContent> */}
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Library section */}
        <div className="flex justify-between "> {/* Added margin-top for spacing */}
          <SidebarGroupLabel className="w-full text-sm h-full">
            {/* Pass the songs prop to the Libary component */}
           <Libary songs={songs}/>
            
          </SidebarGroupLabel>
        </div>
      </SidebarContent>
      {/* Render children passed to AppSidebar */}
    </Sidebar>
  );
}
export default AppSidebar