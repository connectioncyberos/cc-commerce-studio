import { Button, Card, Input, Textarea } from "@/components/ui";

export function WorkspaceForm() {
  return (
    <Card className="mb-6">
      <form className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-300">
            Nome do workspace
          </label>
          <Input name="name" placeholder="Ex: Minha Loja Online" />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-300">
            Slug
          </label>
          <Input name="slug" placeholder="minha-loja-online" />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-300">
            Descrição
          </label>
          <Textarea
            name="description"
            placeholder="Descreva rapidamente este workspace"
            rows={4}
          />
        </div>

        <Button type="button">Salvar Workspace</Button>
      </form>
    </Card>
  );
}