import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  HttpStatus,
  Res,
  Req,
  Logger,
} from '@nestjs/common';
import { PaylistService } from './paylist.service';
import { CreatePaylistDto } from './dto/create-paylist.dto';
import { UpdatePaylistDto } from './dto/update-paylist.dto';
import { PayList } from 'src/entities/paylist.entity';
import { Request } from 'express';
import { keyCheck } from 'src/auth/keyCheck-decorators';
import { keyPipe } from 'src/auth/keyPipes';
