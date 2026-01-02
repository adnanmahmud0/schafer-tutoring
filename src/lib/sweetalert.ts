import Swal, { SweetAlertIcon } from "sweetalert2";

/**
 * Common alert utility for the application.
 * Centered logic for consistent styling across all pages.
 */
export const showAlert = async (
    type: "success" | "error" | "warning" | "info" | "question",
    title: string,
    text: string,
    options: {
        confirmButtonText?: string;
        confirmButtonColor?: string;
        showCancelButton?: boolean;
        cancelButtonText?: string;
    } = {}
) => {
    const isSuccess = type === "success";

    return Swal.fire({
        icon: type as SweetAlertIcon,
        title,
        text,
        confirmButtonColor:
            options.confirmButtonColor || (isSuccess ? "#0B31BD" : "#0B31BD"),
        confirmButtonText: options.confirmButtonText || "OK",
        showCancelButton: options.showCancelButton || false,
        cancelButtonText: options.cancelButtonText || "Cancel",
        allowOutsideClick: false,
        customClass: {
            popup: "animate__animated animate__fadeInDown",
            confirmButton: "font-medium",
        },
        didOpen: () => {
            const popup = Swal.getPopup();
            const icon = Swal.getIcon();
            const titleEl = Swal.getTitle();
            const textEl = Swal.getHtmlContainer();

            // Popup: NO border, ONLY shadow
            if (popup) {
                popup.style.border = "none";
                popup.style.borderRadius = "12px";
                popup.style.boxShadow = "0 12px 30px rgba(0, 0, 0, 0.25)";
            }

            // Icon color handling
            if (icon) {
                const color = isSuccess ? "#1fb141" : "#d63124";
                icon.style.color = color;
                icon.style.borderColor = color;
            }

            // Text readability
            if (titleEl) titleEl.style.color = "#000";
            if (textEl) textEl.style.color = "#000";
        },
    });
};
