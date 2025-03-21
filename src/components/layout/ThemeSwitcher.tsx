
import { Moon, Sun, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/lib/theme";

export function ThemeSwitcher() {
  const { theme, setTheme, accent, setAccent } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full">
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="animate-in slide-in-right">
        <DropdownMenuLabel>Appearance</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={theme} onValueChange={(value) => setTheme(value as "light" | "dark")}>
          <DropdownMenuRadioItem value="light">
            <Sun className="mr-2 h-4 w-4" />
            <span>Light</span>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">
            <Moon className="mr-2 h-4 w-4" />
            <span>Dark</span>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Accent Color</DropdownMenuLabel>
        
        <div className="grid grid-cols-4 gap-1 p-2">
          <button
            className={`h-8 w-8 rounded-full bg-blue-500 ${
              accent === "blue" ? "ring-2 ring-primary ring-offset-2" : ""
            }`}
            onClick={() => setAccent("blue")}
            title="Blue"
          />
          <button
            className={`h-8 w-8 rounded-full bg-purple-500 ${
              accent === "purple" ? "ring-2 ring-primary ring-offset-2" : ""
            }`}
            onClick={() => setAccent("purple")}
            title="Purple"
          />
          <button
            className={`h-8 w-8 rounded-full bg-teal-500 ${
              accent === "teal" ? "ring-2 ring-primary ring-offset-2" : ""
            }`}
            onClick={() => setAccent("teal")}
            title="Teal"
          />
          <button
            className={`h-8 w-8 rounded-full bg-amber-500 ${
              accent === "amber" ? "ring-2 ring-primary ring-offset-2" : ""
            }`}
            onClick={() => setAccent("amber")}
            title="Amber"
          />
          <button
            className={`h-8 w-8 rounded-full bg-rose-500 ${
              accent === "rose" ? "ring-2 ring-primary ring-offset-2" : ""
            }`}
            onClick={() => setAccent("rose")}
            title="Rose"
          />
          <button
            className={`h-8 w-8 rounded-full bg-[#39ff14] ${
              accent === "neon" ? "ring-2 ring-primary ring-offset-2" : ""
            }`}
            onClick={() => setAccent("neon")}
            title="Neon"
          />
          <button
            className={`h-8 w-8 rounded-full bg-[#0ea5e9] ${
              accent === "cyan" ? "ring-2 ring-primary ring-offset-2" : ""
            }`}
            onClick={() => setAccent("cyan")}
            title="Cyan"
          />
          <button
            className={`h-8 w-8 rounded-full bg-[#d946ef] ${
              accent === "magenta" ? "ring-2 ring-primary ring-offset-2" : ""
            }`}
            onClick={() => setAccent("magenta")}
            title="Magenta"
          />
          <button
            className={`h-8 w-8 rounded-full bg-green-500 ${
              accent === "green" ? "ring-2 ring-primary ring-offset-2" : ""
            }`}
            onClick={() => setAccent("green")}
            title="Green"
          />
          <button
            className={`h-8 w-8 rounded-full bg-red-500 ${
              accent === "red" ? "ring-2 ring-primary ring-offset-2" : ""
            }`}
            onClick={() => setAccent("red")}
            title="Red"
          />
          <button
            className={`h-8 w-8 rounded-full bg-orange-500 ${
              accent === "orange" ? "ring-2 ring-primary ring-offset-2" : ""
            }`}
            onClick={() => setAccent("orange")}
            title="Orange"
          />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
