import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function SettingsPage() {
  return (
    <div className="space-y-6 px-4 md:px-8">
      <h1 className="text-3xl font-bold tracking-tight">Paramètres</h1>
      <div className="max-w-2xl space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Paramètres du Profil</CardTitle>
            <CardDescription>
              Gérez les paramètres et préférences de votre compte.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom</Label>
              <Input id="name" placeholder="Votre nom" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Votre email" />
            </div>
            <Button>Enregistrer les Modifications</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Préférences</CardTitle>
            <CardDescription>
              Personnalisez votre expérience d'application.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currency">Devise</Label>
              <Select>
                <SelectTrigger id="currency">
                  <SelectValue placeholder="Sélectionnez la devise" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="usd">USD ($)</SelectItem>
                  <SelectItem value="eur">EUR (€)</SelectItem>
                  <SelectItem value="gbp">GBP (£)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date-format">Format de Date</Label>
              <Select>
                <SelectTrigger id="date-format">
                  <SelectValue placeholder="Sélectionnez le format de date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mm-dd-yyyy">MM/DD/YYYY</SelectItem>
                  <SelectItem value="dd-mm-yyyy">DD/MM/YYYY</SelectItem>
                  <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button>Enregistrer les Préférences</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              Gérez vos préférences de notification.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email-notifications">Notifications par Email</Label>
              <Select>
                <SelectTrigger id="email-notifications">
                  <SelectValue placeholder="Sélectionnez la préférence de notification" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les notifications</SelectItem>
                  <SelectItem value="important">Importantes uniquement</SelectItem>
                  <SelectItem value="none">Aucune</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button>Enregistrer les Paramètres de Notification</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

