import { Routes } from '@angular/router';
import { ClientRegistrationComponent } from './pages/client-registration/client-registration.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ClientLoginComponent } from './pages/client-login/client-login.component';
import { ClientProfileComponent } from './pages/client-profile/client-profile.component';
import { InfoComponent } from './pages/client-profile/info/info.component';
import { MailboxComponent } from './pages/client-profile/mailbox/mailbox.component';
import { HistoryComponent } from './pages/client-profile/history/history.component';
import { ShopkeeperRegistrationComponent } from './pages/client-profile/shopkeeper-registration/shopkeeper-registration.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminComponent } from './pages/admin/admin.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { ShopkeepersubComponent } from './pages/admin/shopkeepersub/shopkeepersub.component';
import { ShopsComponent } from './pages/admin/shops/shops.component';
import { UsersComponent } from './pages/admin/users/users.component';
import { ShopComponent } from './pages/shop/shop.component';
import { PromotionsComponent } from './pages/shop/promotions/promotions.component';
import { ProductsComponent } from './pages/shop/products/products.component';
import { EventsComponent } from './pages/shop/events/events.component';
import { ContactComponent } from './pages/shop/contact/contact.component';
import { MyShopComponent } from './pages/client-profile/my-shop/my-shop.component';
import { MyEventsComponent } from './pages/client-profile/my-shop/my-events/my-events.component';
import { MyProductsComponent } from './pages/client-profile/my-shop/my-products/my-products.component';
import { MyInfosComponent } from './pages/client-profile/my-shop/my-infos/my-infos.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { EventlistComponent } from './pages/eventlist/eventlist.component';

export const routes: Routes = [
    { path: '', component: HomepageComponent,canActivate:[AuthGuard] },
    {path:'register', component: ClientRegistrationComponent },
    {path:'login', component: ClientLoginComponent },
    {path: 'profile', component: ClientProfileComponent,canActivate: [AuthGuard], children: [
        { path: 'info', component: InfoComponent },
        { path: 'mailbox', component: MailboxComponent },
        { path: 'history', component: HistoryComponent },
        { path: 'shopkeeper-registration', component: ShopkeeperRegistrationComponent },
        { path: 'my-shop', component: MyShopComponent, children: [
            { path: 'my-infos', component: MyInfosComponent },
            { path: 'my-products', component: MyProductsComponent },
            { path: 'my-events', component:  MyEventsComponent},
            { path: '', redirectTo: 'my-infos', pathMatch: 'full' }
        ]},
        { path: '', redirectTo: 'info', pathMatch: 'full' }
    ]},
    {path:'admin', component: AdminComponent, canActivate: [AuthGuard],children: [
        { path: 'dashboard', component: DashboardComponent },
        { path: 'shopkeepersub', component: ShopkeepersubComponent },
        { path: 'shops', component: ShopsComponent },
        { path: 'users', component: UsersComponent },
        { path: 'mailbox', component: MailboxComponent },
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ] },
    {path:'shop/:id', component: ShopComponent, children: [
        { path: 'promotions', component: PromotionsComponent},
        { path: 'products', component: ProductsComponent},
        { path: 'events', component: EventsComponent},
        { path: 'contact', component: ContactComponent},
        { path: '', redirectTo: 'promotions', pathMatch: 'full' }
    ] },
    { path: 'product/:productId', component: ProductDetailsComponent },
    { path: 'events', component: EventlistComponent },
];
