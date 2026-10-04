import { render, screen, waitFor } from "@testing-library/react";
import Home from "../app/page";

test("renderiza itens da API", async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ status: "ok", items: ["Configurar Docker"] }),
  });
  render(<Home />);
  await waitFor(() =>
    expect(screen.getByText("Configurar Docker")).toBeTruthy()
  );
});