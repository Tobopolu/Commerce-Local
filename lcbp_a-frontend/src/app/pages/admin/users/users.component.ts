import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { GlobalUserData } from '../../../interfaces/global-user-data';

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})

export class UsersComponent implements OnInit {
  auth: AuthService;
  toastr: ToastrService;
  usersData: GlobalUserData[] = [];
  
  selectedFilter: number | null = null;
  selectedFilterLabel: string = 'Tous';
  activeSection: { [userId: number]: string } = {};

  constructor(auth: AuthService, toastr: ToastrService) {
    this.auth = auth;
    this.toastr = toastr;
  }


  async ngOnInit() {
    await this.loadUsers();   
  }

  //fetch usersData[]
  async loadUsers() {
    this.auth.getAllUsersAndTheirFamily().subscribe({
      next: (data) => {
        this.usersData = this.parseUsers(data[0])
      },
      complete: () => {
        //set base nav of each user
        this.usersData.forEach(user => {
          this.setActiveSection(user.id_user, 'info');
        });
      },
      error: (errorMessage) => {
        this.toastr.error(errorMessage, "Erreur", { timeOut: 1500 });
      }
    });

  }

  // Restructure usersData[]
  parseUsers(rows: any[]): GlobalUserData[] {
    const usersMap = new Map<number, GlobalUserData>();

    rows.forEach(row => {
      if (!usersMap.has(row.id_user)) {
        usersMap.set(row.id_user, {
          id_user: row.id_user,
          firstname: row.firstname,
          lastname: row.lastname,
          email: row.email,
          phone: row.phone,
          role: row.role,
          shop: row.id_shop ? {
            id_shop: row.id_shop,
            name: row.shop_name,
            description: row.shop_description,
            address: row.shop_address,
            image: row.shop_image,
            phone: row.shop_phone,
            siret: row.siret,
            legalproof: row.legalproof,
            logo: row.logo,
            id_shoprequest: row.id_shoprequest,
            id_status: row.id_status
          } : undefined,
          sentMessages: [],
          receivedMessages: [],
          comments: [],
          orders: []
        });
      }

      const user = usersMap.get(row.id_user)!;

      if (row.sent_message_id && !user.sentMessages.some(m => m.id_message === row.sent_message_id)) {
        user.sentMessages.push({
          id_message: row.sent_message_id,
          id_recipient: row.sent_recipient,
          title: row.sent_title,
          message: row.sent_message,
          date: row.sent_date
        });
      }
  
      if (row.received_message_id && !user.receivedMessages.some(m => m.id_message === row.received_message_id)) {
        user.receivedMessages.push({
          id_message: row.received_message_id,
          id_sender: row.received_sender,
          title: row.received_title,
          message: row.received_message,
          date: row.received_date
        });
      }
  
      if (row.id_order && !user.orders.some(o => o.id_order === row.id_order)) {
        user.orders.push({
          id_order: row.id_order,
          state: row.state
        });
      }
  
      if (row.id_comment && !user.comments.some(c => c.id_comment === row.id_comment)) {
        user.comments.push({
          id_comment: row.id_comment,
          id_product: row.comment_product,
          product_name: row.comment_product_name,
          message: row.comment_message,
          date: row.comment_date,
          note: row.comment_note
        });
      }
    });
  
    return Array.from(usersMap.values());
  }

  setActiveSection(userId: number, section: string) {
    this.activeSection[userId] = section;
  }

  isActiveSection(userId: number, section: string): boolean {
    return this.activeSection[userId] === section;
  }
  
  getUserFullNameById(id: number | undefined): string {
    const user = this.usersData.find(u => u.id_user === id);
    return user ? `${user.firstname} ${user.lastname}` : 'User Not Found';
  }

  handleDel(id:number,ln:string,fn:string){
    
    if (confirm(`Voulez-vous vraiment supprimer l'utilisateur : ${id}.${ln} ${fn}?`)) {    
      this.auth.deleteUser(id).subscribe(() => {
        this.loadUsers();
      });
    }
  }

} 