# Interfaz Gráfica para Exámenes de la Universidad 📎

Una plataforma web para facilitar el acceso a exámenes antiguos almacenados en formato PDF e imágenes en un repositorio de GitHub [ExamenesViejos-FaMAF-Computacion](https://github.com/ExamenesViejos-FaMAF-Computacion/ExamenesViejos-FaMAF-Computacion).

## Sitio web 🌐

Podes acceder a la web en [este enlace](https://examenes-viejos.pages.dev/).

## Colabora con código 🤝💻

Si deseas contribuir con código, por favor:

1. Haz un [_fork_](https://github.com/ramiro-l/Examenes-Viejos-Web/fork) del Proyecto.
2. Clona tu _fork_ .
3. Añade el repositorio original como remoto:
   `git remote add upstream https://github.com/ramiro-l/Examenes-Viejos-Web`
4. Crea tu Rama de Funcionalidad:
   `git checkout -b feature/CaracteristicaIncreible`
5. Realiza tus cambios y seguí las [convenciones para los commits](#formato-de-los-commits-📝).
6. Asegúrate de seguir las **directrices de estilo** existentes.
7. Haz Push a la Rama:
   `git push origin feature/CaracteristicaIncreible`
8. Abre una [_pull request_](https://github.com/ramiro-l/Examenes-Viejos-Web/pulls) con una descripción detallada de los cambios propuestos y referencia al problema relacionado.

> [!NOTE]
>
> 1. En caso de **error al crear los commits** ejecutar `pnpm run format` porque se esta usando [husky](https://typicode.github.io/husky/) para garantizar la consistencia en los estilos.
> 2. Tambien puede ser porque no se esta siguiendo el formato de los commits, para mas informacion ver [Formato de los Commits](#formato-de-los-commits-📝). Generalmente estos errores sugen al hacer `merge`, porque te auto completa el mensaje del commit.

## Contribuye con ideas, errores o comentarios 💡

Si tienes una idea, encuentras un error o deseas dar feedback sobre el proyecto:

-   Abre un nuevo problema en el repositorio describiendo tu idea, el error que encontraste o el feedback que deseas compartir.

-   Sé lo más detallado posible en la descripción.

-   Si es posible, incluye capturas de pantalla u otros recursos que puedan ayudar a entender mejor tu punto.

## Formato de los Commits 📝

Las convenciones de commit utilizadas en este proyecto son las siguientes:

-   **Tipo de Commit**: El tipo de commit proporciona contexto sobre el cambio realizado. Algunos ejemplos comunes incluyen feat para nuevas características, fix para correcciones de errores y docs para cambios en la documentación.

-   **Ámbito Opcional**: El ámbito proporciona información adicional sobre el alcance del cambio, como el módulo o componente afectado.

-   **Descripción del Cambio**: La descripción del cambio debe ser breve pero descriptiva, proporcionando suficiente información para entender el propósito del commit.

Ejemplo de un commit siguiendo estas convenciones:

```bash
feat(login): add email validation
```

> [!IMPORTANT]
> Este proyecto sigue los **Conventional Commits** para mantener un historial claro y consistente de cambios.

Para obtener más información sobre Commits Convencionales, consulta la [web oficial](https://www.conventionalcommits.org/es/v1.0.0/).  
Aquí tienes [Conventional Commits para VSCode](https://marketplace.visualstudio.com/items?itemName=vivaxy.vscode-conventional-commits).

## Instalación y Ejecución 🛠️

Clonar el repositorio con el siguiente comando:

```bash
git clone https://github.com/ramiro-l/Examenes-Viejos-Web.git
```

Ingresa al directorio del proyecto `cd Examenes-Viejos-Web` y ejecuta el siguiente comando para instalar las dependencias:

```bash
pnpm install
```

Esto **es opcional** pero puedes configurar las variables de entorno en un archivo `.env` en la raíz del proyecto. Puedes copiar el archivo `.env.example` y renombrarlo a `.env` para configurar las variables de entorno.
Especiamente la variable `GITHUB_ACCESS_TOKEN` que es necesaria para realizar las consultas a la API de GitHub. Si no se configura, **no pasa nada**, se utilizan respuestas de prueba que estan en `./src/services/examenes/examples-fetch`.

Finalmente para ejecutar la aplicación en modo de desarrollo:

```bash
pnpm dev
```

> Se utiliza `pnpm` como gestor de paquetes pero puedes utilizar `npm` o el que prefieras.
