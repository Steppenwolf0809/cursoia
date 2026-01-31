import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
from matplotlib.patches import FancyBboxPatch, Circle, Rectangle
import numpy as np

# Configuración
fig, ax = plt.subplots(figsize=(11, 7.5), facecolor='#f8fafc')
ax.set_xlim(0, 11)
ax.set_ylim(0, 7.5)
ax.set_aspect('equal')
ax.axis('off')

# Colores modernos
colors = {
    'rol': '#3b82f6',      # Azul
    'contexto': '#8b5cf6', # Púrpura
    'tarea': '#10b981',    # Verde
    'flecha': '#64748b',   # Gris
    'title': '#1e293b'
}

# Función para dibujar caja con número
def draw_box(ax, x, y, width, height, number, icon_text, title, subtitle, color):
    # Sombra
    shadow = FancyBboxPatch((x+0.08, y-0.08), width, height,
                           boxstyle="round,pad=0.02,rounding_size=0.25",
                           facecolor='#00000012', edgecolor='none')
    ax.add_patch(shadow)
    
    # Caja principal
    box = FancyBboxPatch((x, y), width, height,
                        boxstyle="round,pad=0.02,rounding_size=0.25",
                        facecolor='white', edgecolor=color, linewidth=2.5)
    ax.add_patch(box)
    
    # Círculo con número
    circle = Circle((x + 0.45, y + height/2), 0.32, 
                   facecolor='#1e293b', edgecolor='none', zorder=5)
    ax.add_patch(circle)
    ax.text(x + 0.45, y + height/2, str(number), fontsize=16, 
            fontweight='bold', ha='center', va='center', color='white', zorder=6)
    
    # Icono (círculo pequeño de color)
    icon_circle = Circle((x + 1.15, y + height - 0.45), 0.22, 
                        facecolor=color, edgecolor='none', alpha=0.15, zorder=3)
    ax.add_patch(icon_circle)
    ax.text(x + 1.15, y + height - 0.45, icon_text, fontsize=14, 
            fontweight='bold', ha='center', va='center', color=color, zorder=4)
    
    # Título
    ax.text(x + 1.55, y + height - 0.45, title, fontsize=13, 
            fontweight='bold', ha='left', va='center', color='#1e293b')
    
    # Subtítulo
    ax.text(x + 1.55, y + height/2 - 0.25, subtitle, fontsize=10, 
            ha='left', va='center', color='#64748b')

# Dibujar las tres cajas
draw_box(ax, 1, 5.2, 4, 1.6, 1, 'R', 'ROL', 'Experto / Editor / Abogado...', colors['rol'])
draw_box(ax, 1, 2.9, 4, 1.6, 2, 'C', 'CONTEXTO', 'Situación / Audiencia / Restricciones', colors['contexto'])
draw_box(ax, 1, 0.6, 4, 1.6, 3, 'T', 'TAREA', 'Verbo claro y específico', colors['tarea'])

# Flechas de conexión vertical
for y_start, y_end in [(5.2, 4.5), (2.9, 2.2)]:
    ax.annotate('', xy=(3, y_end), xytext=(3, y_start),
                arrowprops=dict(arrowstyle='->', color=colors['flecha'], lw=2.5))

# Flecha curva hacia el resultado
ax.annotate('', xy=(8.2, 3.5), xytext=(5, 1.4),
            arrowprops=dict(arrowstyle='->', color=colors['tarea'], lw=2.5,
                          connectionstyle="arc3,rad=-0.25"))

# Caja de resultado (FORMATO)
result_shadow = FancyBboxPatch((8.1, 2.5), 2.3, 2,
                              boxstyle="round,pad=0.02,rounding_size=0.3",
                              facecolor='#00000015', edgecolor='none')
ax.add_patch(result_shadow)

result_box = FancyBboxPatch((8, 2.6), 2.3, 2,
                           boxstyle="round,pad=0.02,rounding_size=0.3",
                           facecolor='#fef3c7', edgecolor='#f59e0b', linewidth=3)
ax.add_patch(result_box)

# Contenido de resultado
result_circle = Circle((9.15, 4.1), 0.35, 
                      facecolor='#f59e0b', edgecolor='none', alpha=0.2)
ax.add_patch(result_circle)
ax.text(9.15, 4.1, 'F', fontsize=18, fontweight='bold', 
        ha='center', va='center', color='#92400e')

ax.text(9.15, 3.4, 'FORMATO', fontsize=13, fontweight='bold', 
        ha='center', va='center', color='#92400e')
ax.text(9.15, 2.95, 'Resultado', fontsize=10, 
        ha='center', va='center', color='#b45309')
ax.text(9.15, 2.7, 'optimo', fontsize=10, 
        ha='center', va='center', color='#b45309')

# Título principal del diagrama
ax.text(5.5, 7.1, 'Framework de Prompting', fontsize=20, 
        fontweight='bold', ha='center', va='center', color=colors['title'])
ax.text(5.5, 6.5, 'Esta estructura funciona en TODAS las IAs', fontsize=12, 
        ha='center', va='center', color='#64748b')

# Línea decorativa debajo del título
line = Rectangle((3.5, 6.15), 4, 0.06, facecolor='#cbd5e1', edgecolor='none')
ax.add_patch(line)

plt.tight_layout()
plt.savefig('c:\\curso_IA\\prompt_framework_diagram.png', 
            dpi=200, bbox_inches='tight', facecolor='#f8fafc',
            edgecolor='none', pad_inches=0.4)
print('Imagen guardada: prompt_framework_diagram.png')
