# Gestión de Productos con Next.js y Cloudinary

Una aplicación de CRUD que permite a los usuarios agregar, eliminar y actualizar productos, incluyendo la subida de imágenes utilizando Cloudinary. Además, utiliza JSON Web Tokens (JWT), jose y react-easy-crop para proporcionar funcionalidades adicionales de autenticación y edición de imágenes.

## Tecnologías Utilizadas

- **Next.js:** Framework de React para la construcción de aplicaciones web.
- **Tailwind CSS:** Biblioteca de estilos CSS utilizable.
- **MySQL:** Sistema de gestión de bases de datos relacional para almacenar la información de los productos.
- **Cloudinary:** Servicio en la nube para almacenar y gestionar imágenes.
- **JSON Web Tokens (JWT):** Para la autenticación de usuarios y la protección de rutas privadas.
- **jose:** Biblioteca para la manipulación de JWT en JavaScript.
- **react-easy-crop:** Componente React para recortar imágenes de manera fácil y flexible.

## Características

- **Crear Producto:** Permite a los usuarios agregar nuevos productos con detalles como nombre, descripción, precio y una imagen.
- **Actualizar Producto:** Los usuarios pueden editar los detalles de los productos existentes, incluyendo la posibilidad de cambiar la imagen asociada.
- **Eliminar Producto:** Permite a los usuarios eliminar productos que ya no necesitan.
- **Subir Imágenes:** Utiliza Cloudinary para almacenar y gestionar las imágenes asociadas a los productos, con funcionalidades avanzadas de edición como recorte.
- **Autenticación:** Utiliza JSON Web Tokens para autenticar a los usuarios y proteger las rutas privadas.

## Instalación

Sigue estos pasos para clonar y ejecutar la aplicación en tu entorno local:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/RaulEMiranda/CRUD-Cloudinary.git
